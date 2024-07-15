import React, { useEffect } from "react";
import * as yup from "yup";
import { Button, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Formik } from "formik";
import ThemedInput from "../../components/ThemedInput";
import ThemedText from "../../components/ThemedText";
import RNPickerSelect, { Item } from "react-native-picker-select";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import { fetchRolesAsync, registrationAsync } from "../../redux/auth/authAsyncServerFunctions.ts";
import { setStatus, setStatusDescription } from "../../redux/auth/authSlice.ts";
import {useTranslation} from 'react-i18next';

interface FormValues {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    roleId: number | null;
}

interface FormActions {
    setFieldValue: (field: string, value: any) => void;
    resetForm: () => void;
}

const RegistrationScreen = () => {
    const {t} = useTranslation();

    const reviewSchema = yup.object({
        email: yup
            .string()
            .email(t('screen.registration.email.error'))
            .min(4, t('screen.registration.email.min4'))
            .required(t('screen.registration.email.required')),
        name: yup
            .string()
            .required(t('screen.registration.name.required')),
        password: yup
            .string()
            .matches(/[0-9]/, t('screen.registration.password.digit1'))
            .min(6, t('screen.registration.password.min6'))
            .required(t('screen.registration.password.required')),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], t('screen.registration.confirmPassword.match'))
            .required(t('screen.registration.confirmPassword.required')),
        roleId: yup
            .number()
            .nonNullable(t('screen.registration.role.required'))
            .required(t('screen.registration.role.required'))
    });

    const { themeType } = useAppSelector(state => state.settings);
    const { roles } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [roleId, setRoleId] = React.useState(null);

    useEffect(() => {
        dispatch(fetchRolesAsync());
    }, []);

    const handleFormSubmit = (values: FormValues, actions: FormActions) => {
        if (values.roleId) {
            dispatch(registrationAsync({
                username: values.email,
                name: values.name,
                password: values.password,
                roleId: values.roleId
            }));
            actions.resetForm();
            actions.setFieldValue("roleId", null);
            setRoleId(null);
        } else {
            dispatch(setStatus("failed"));
            dispatch(setStatusDescription("Failed to register. Please select a role and try again"));
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...globalStyles.container, ...globalStyles[`${themeType}View`] }}>
                <Formik
                    initialValues={{ email: "", name: "", password: "", confirmPassword: "", roleId: null }}
                    validationSchema={reviewSchema}
                    onSubmit={handleFormSubmit}>
                    {(props) => (
                        <View style={styles.formView}>
                            <ThemedInput
                                placeholder={t('screen.registration.email.placeholder')}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
                                onBlur={props.handleBlur("email")}
                            />
                            {props.touched.email && props.errors.email &&
                              <ThemedText style={"ErrorText"}>{props.errors.email}</ThemedText>}
                            <ThemedInput
                                placeholder={t('screen.registration.name.placeholder')}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("name")}
                                value={props.values.name}
                                onBlur={props.handleBlur("name")}
                            />
                            {props.touched.name && props.errors.name &&
                              <ThemedText style={"ErrorText"}>{props.errors.name}</ThemedText>}
                            <ThemedInput
                                placeholder={t('screen.registration.password.placeholder')}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("password")}
                                value={props.values.password}
                                onBlur={props.handleBlur("password")}
                                secureTextEntry
                            />
                            {props.touched.password && props.errors.password &&
                              <ThemedText style={"ErrorText"}>{props.errors.password}</ThemedText>}
                            <ThemedInput
                                placeholder={t('screen.registration.confirmPassword.placeholder')}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("confirmPassword")}
                                value={props.values.confirmPassword}
                                onBlur={props.handleBlur("confirmPassword")}
                                secureTextEntry
                            />
                            {props.touched.confirmPassword && props.errors.confirmPassword &&
                              <ThemedText style={"ErrorText"}>{props.errors.confirmPassword}</ThemedText>}
                            <RNPickerSelect
                                value={roleId}
                                placeholder={{ label: t('screen.registration.role.select'), value: null }}
                                items={roles.map(role => ({ label: role.roleName, value: role.roleId }) as Item)}
                                onValueChange={(value) => {
                                    setRoleId(value);
                                    props.setFieldValue("roleId", value);
                                }}
                                style={{
                                    inputAndroid: {
                                        ...globalStyles[`${themeType}Input`]
                                    },
                                    inputIOS: {
                                        ...globalStyles[`${themeType}Input`]
                                    }
                                }}
                                darkTheme={themeType === "dark"}
                            />
                            {props.touched.roleId && props.errors.roleId &&
                              <ThemedText style={"ErrorText"}>{props.errors.roleId}</ThemedText>}
                            <Button title={t('screen.registration.submit')} onPress={() => props.handleSubmit()} />
                        </View>
                    )}
                </Formik>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
    formView: {
        width: "90%"
    }
});
