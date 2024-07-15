import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnterTheParkScreen from "../screens/EnterTheParkScreen";
import LeaveTheParkScreen from "../screens/LeaveTheParkScreen";
import InformationScreen from "../screens/InformationScreen";
import RegistrationScreen from "../screens/admin/RegistrationScreen";
import OtherFunctionsScreen from "../screens/OtherFunctionsScreen";
import { globalStyles } from "../styles/globalStyles";
import { useAppSelector } from "../redux/store.ts";
import SettingsScreen from "../screens/SettingsScreen.tsx";
import Logout from "../components/Logout.tsx";
import Settings from "../components/Settings.tsx";
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();
const StackAdminOther = ({ navigation }: any) => {
    const {t} = useTranslation();
    const { themeType } = useAppSelector(state => state.settings);
    return (
        <Stack.Navigator initialRouteName={"OtherFunctions"} screenOptions={{
            headerStyle: {
                backgroundColor: globalStyles[`${themeType}View`].backgroundColor
            },
            headerTintColor: globalStyles[`${themeType}Text`].color,
            headerTitleStyle: {
                fontWeight: "bold"
            },
            headerShadowVisible: false
        }}>
            <Stack.Screen name={"OtherFunctions"} component={OtherFunctionsScreen} options={{ headerTitle: t('stack.adminOther.other'),
                headerRight: () => <Settings/>,
                headerLeft: () => <Logout/>
            }} initialParams={{ source: "admin" }} />
            <Stack.Screen name={"Registration"} component={RegistrationScreen} options={{ headerTitle: t('stack.adminOther.registration')}}/>
            <Stack.Screen name={"Settings"} component={SettingsScreen} options={{ headerTitle: t('stack.adminOther.settings')}}/>
            <Stack.Screen name={"Enter"} component={EnterTheParkScreen} options={{ headerTitle: t('stack.adminOther.enter')}}/>
            <Stack.Screen name={"Leave"} component={LeaveTheParkScreen} options={{ headerTitle: t('stack.adminOther.leave')}}/>
            <Stack.Screen name={"Information"} component={InformationScreen} options={{ headerTitle: t('stack.adminOther.info')}}/>
        </Stack.Navigator>
    );
};

export default StackAdminOther;
