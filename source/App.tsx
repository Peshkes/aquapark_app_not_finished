import { SafeAreaView, StatusBar, StatusBarStyle, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { globalStyles } from "./styles/globalStyles.ts";
import TabEmployee from "./navigation/TabEmployee.tsx";
import TabAdmin from "./navigation/TabAdmin.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import { useAppDispatch, useAppSelector } from "./redux/store.ts";
import { clearUserAsync, getUserAsync } from "./redux/auth/authAsyncPhoneStorageFunctions.ts";
import { fetchTokenAsync } from "./redux/auth/authAsyncServerFunctions.ts";
import { getLanguageAsync, getThemeAsync } from "./redux/settings/settingsAsyncPhoneStorageFunctions.ts";
import { setTheme } from "./redux/settings/settingsSlice.ts";
import { logout } from "./redux/auth/authSlice.ts";
import StatusIndicator from "./components/StatusIndicator.tsx";
import i18n from'./locales/i18n';

export default function App() {
    const { user } = useAppSelector(state => state.auth);
    const { themeType, language } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();
    const colorScheme = useColorScheme();
    const [hasTabNavigator, setHasTabNavigator] = useState(false);

    useEffect(() => {
        dispatch(getLanguageAsync())
        const selectTheme = async () => {
            const theme = await dispatch(getThemeAsync());
            if (!theme.payload) {
                if (colorScheme === "light")
                    dispatch(setTheme("light"));
                else
                    dispatch(setTheme("dark"));
            }
        };
        selectTheme();

        dispatch(fetchTokenAsync())
            .then(response =>{
                if (response.type === "auth/fetchToken/fulfilled") {
                    dispatch(getUserAsync());
                } else if (response.type === "auth/fetchToken/rejected") {
                    if (user) {
                        dispatch(clearUserAsync());
                        dispatch(logout());
                    }
                }
            });
    }, []);

    useEffect(() => {
        if (user) {
            setHasTabNavigator(true);
        } else {
            setHasTabNavigator(false);
        }
    }, [user]);

    return (
        <SafeAreaView style={globalStyles[`${themeType}View`]}>
            {themeType ? <StatusBar barStyle={globalStyles[`${themeType}StatusBar`].color as StatusBarStyle}
                                    backgroundColor={globalStyles[`${themeType}View`].backgroundColor} /> :
                <StatusBar />
            }
            {user ?
                <NavigationContainer>
                    {user?.roles.includes("ROLE_ADMIN") ? <TabAdmin /> : <TabEmployee />}
                </NavigationContainer>
                :
                <AuthScreen />
            }
            <StatusIndicator hasTabNavigator={hasTabNavigator}/>
        </SafeAreaView>
    );
}
