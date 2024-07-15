import React, { useState } from "react";
import {
    Button,
    Keyboard,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Formik } from "formik";
import * as yup from "yup";
import ThemedInput from "../components/ThemedInput";
import ThemedText from "../components/ThemedText";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { fetchTokenAsync, loginAsync } from "../redux/auth/authAsyncServerFunctions.ts";
import { saveUserAsync } from "../redux/auth/authAsyncPhoneStorageFunctions.ts";
import Icon from "react-native-vector-icons/FontAwesome";
import { setServerUrl } from "../redux/auth/authSlice.ts";
import { useTranslation } from "react-i18next";



const AuthScreen = () => {
    const {t} = useTranslation();
    const reviewSchema = yup.object({
        username: yup
            .string()
            .email(t("screen.login.email.error"))
            .min(4, t("screen.login.email.min4"))
            .required(t("screen.login.email.required")),
        password: yup
            .string()
            .matches(/[0-9]/, t("screen.login.password.digit1"))
            .min(6, t("screen.login.password.min6"))
            .required(t("screen.login.password.required"))
    });

    const { themeType } = useAppSelector(state => state.settings);
    const { csrfToken, user, serverUrl } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [newServerUrl, setNewServerUrl] = useState(serverUrl);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...globalStyles.container, ...globalStyles[`${themeType ? themeType : "dark"}View`] }}>
                <TouchableOpacity
                    style={styles.settingsIcon}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon name="cog" size={30} color={themeType === "dark" ? "white" : "black"} />
                </TouchableOpacity>

                <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        dispatch(loginAsync({
                            username: values.username.toLowerCase(),
                            password: values.password
                        })).then((response) => {
                                if (response.type === "auth/login/fulfilled") {
                                    if (!csrfToken)
                                        dispatch(fetchTokenAsync());
                                    setTimeout(() => dispatch(saveUserAsync(response.payload)), 6000);
                                }
                            }
                        );
                    }}>
                    {(props) => (
                        <View style={styles.formView}>
                            <ThemedInput
                                placeholder={t("screen.login.email.placeholder")}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("username")}
                                value={props.values.username}
                                onBlur={props.handleBlur("username")}
                                keyboardType={"email-address"}
                            />
                            {props.touched.username && props.errors.username &&
                                <ThemedText style={"ErrorText"}>{props.errors.username}</ThemedText>}
                            <ThemedInput
                                placeholder={t("screen.login.password.placeholder")}
                                placeholderTextColor={"gray"}
                                onChangeText={props.handleChange("password")}
                                value={props.values.password}
                                onBlur={props.handleBlur("password")}
                                secureTextEntry
                            />
                            {props.touched.password && props.errors.password &&
                                <ThemedText style={"ErrorText"}>{props.errors.password}</ThemedText>}
                            <Button title={t("screen.login.submit")} onPress={() => props.handleSubmit()} />
                        </View>
                    )}
                </Formik>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View
                                    style={[styles.modalView, themeType === "dark" ? styles.darkModal : styles.lightModal]}>
                                    <Text style={themeType === "dark" ? styles.darkText : styles.lightText}>Server
                                        URL</Text>
                                    <TextInput
                                        style={[styles.input, themeType === "dark" ? styles.darkInput : styles.lightInput]}
                                        placeholder="Enter Server URL"
                                        placeholderTextColor="gray"
                                        value={newServerUrl}
                                        onChangeText={setNewServerUrl}
                                    />
                                    <View style={styles.modalButtons}>
                                        <Button
                                            title="Cancel"
                                            onPress={() => setModalVisible(false)}
                                        />
                                        <Button
                                            title="Save"
                                            onPress={() => {
                                                dispatch(setServerUrl(newServerUrl));
                                                dispatch(fetchTokenAsync());
                                                setModalVisible(false);
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    formView: {
        width: "90%"
    },
    settingsIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        width: "80%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    darkModal: {
        backgroundColor: "#333"
    },
    lightModal: {
        backgroundColor: "#fff"
    },
    input: {
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    darkInput: {
        backgroundColor: "#555",
        color: "white"
    },
    lightInput: {
        backgroundColor: "#eee",
        color: "black"
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    darkText: {
        color: "white"
    },
    lightText: {
        color: "black"
    }
});
