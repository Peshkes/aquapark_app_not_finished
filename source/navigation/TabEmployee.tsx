import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { globalStyles } from "../styles/globalStyles";
import EnterTheParkScreen from "../screens/EnterTheParkScreen";
import LeaveTheParkScreen from "../screens/LeaveTheParkScreen";
import InformationScreen from "../screens/InformationScreen";
import WhoIsInsideScreen from "../screens/WhoIsInsideScreen";
import StackAdminOther from "./StackAdminOther.tsx";
import { useAppSelector } from "../redux/store.ts";
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const TabEmployee = () => {
    const {t} = useTranslation();
    const tabData = [
        { name: t("tab.employee.enter"), component: EnterTheParkScreen, icon: "push" },
        { name: t("tab.employee.leave"), component: LeaveTheParkScreen, icon: "share" },
        { name: t("tab.employee.info"), component: InformationScreen, icon: "information" },
        { name: t("tab.employee.whoIsIn"), component: WhoIsInsideScreen, icon: "help" },
        { name: t("tab.employee.other"), component: StackAdminOther, icon: "people" }
    ];
    const { themeType } = useAppSelector(state => state.settings);

    return (
        <Tab.Navigator
            initialRouteName={tabData[0].name}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const tabInfo = tabData.find(tab => tab.name === route.name);
                    if (!tabInfo) return null;

                    const iconName = focused ? tabInfo.icon : `${tabInfo.icon}-outline`;
                    return <Icon name={iconName} color={color} size={size * 1.2} />;
                },
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    backgroundColor: globalStyles[`${themeType}View`].backgroundColor,
                    borderTopColor: globalStyles[`${themeType}View`].backgroundColor
                },
                headerStyle: {
                    backgroundColor: globalStyles[`${themeType}View`].backgroundColor
                },
                headerTintColor: globalStyles[`${themeType}Text`].color,
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                headerRightContainerStyle: {
                    paddingRight: 20
                },
                headerShadowVisible: false
            })}
        >
            {tabData.map(tab => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                />
            ))}
        </Tab.Navigator>
    );
};

export default TabEmployee;
