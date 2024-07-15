import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { globalStyles } from "../styles/globalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import MakeNewOrderScreen from "../screens/admin/MakeNewOrderScreen.tsx";
import AnalyticsScreen from "../screens/admin/AnalyticsScreen";
import WhoIsInsideScreen from "../screens/WhoIsInsideScreen";
import StackAdminOther from "./StackAdminOther.tsx";
import { useAppSelector } from "../redux/store.ts";
import StackQrScan from "./StackQrScan.tsx";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const TabAdmin = () => {

    const {t} = useTranslation();

    const tabData = [
        { name: t('tab.admin.order'), component: MakeNewOrderScreen, icon: "watch" },
        { name: t('tab.admin.scan'), component: StackQrScan, icon: "qr-code" },
        { name: t('tab.admin.analytics'), component: AnalyticsScreen, icon: "analytics" },
        { name: t('tab.admin.whoIsIn'), component: WhoIsInsideScreen, icon: "help" },
        { name: t('tab.admin.other'), component: StackAdminOther, icon: "people" }
    ];

    const { themeType, language } = useAppSelector(state => state.settings);

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
                headerShown: false
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

export default TabAdmin;
