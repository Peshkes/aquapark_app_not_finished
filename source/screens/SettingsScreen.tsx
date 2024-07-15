import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { toggleTheme, setLanguage } from "../redux/settings/settingsSlice.ts";
import { globalStyles } from "../styles/globalStyles";
import { Language } from "../redux/settings/settingsTypes.ts";
import ThemedView from "../components/ThemedView.tsx";
import {useTranslation} from "react-i18next";
import {
    clearLanguageAsync,
    clearThemeAsync, saveLanguageAsync,
    saveThemeAsync
} from "../redux/settings/settingsAsyncPhoneStorageFunctions.ts";
import { clearUserAsync } from "../redux/auth/authAsyncPhoneStorageFunctions.ts";

const SettingsScreen = () => {
    const {t} = useTranslation();
    const { themeType, language } = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
        dispatch(saveThemeAsync(themeType === "light" ? "dark" : "light"));
    };

    const handleLanguageChange = (selectedLanguage: Language) => {
        dispatch(setLanguage(selectedLanguage));
        dispatch(saveLanguageAsync(selectedLanguage));
    };

    const handleDeleteData = () => {
        Alert.alert(
            t("screen.settings.alert.confirmationTitle"),
            t("screen.settings.alert.confirmationText"),
            [
                {
                    text: t("screen.settings.alert.cancel"),
                    style: "cancel"
                },
                {
                    text: t("screen.settings.alert.confirm"),
                    onPress: () => {
                        dispatch(clearUserAsync());
                        dispatch(clearLanguageAsync());
                        dispatch(clearThemeAsync());
                    }
                }
            ]
        );
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.setting}>
                <Text style={[styles.label, globalStyles[`${themeType}Text`]]}>{t("screen.settings.theme")}</Text>
                <Switch
                    trackColor={{ false: "#D2D2D4", true: "#007AFF" }}
                    thumbColor={themeType === "dark" ? "#faf9f9" : "#f4f3f4"}
                    value={themeType === "dark"}
                    onValueChange={handleThemeToggle}
                />
            </View>

            <View style={styles.setting}>
                <Text
                    style={[styles.label, globalStyles[`${themeType}Text`]]}>{t("screen.settings.language")}</Text>
                <View style={styles.languageOptions}>
                    {["EN", "RU"].map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={[styles.languageButton, language?.includes(lang.toLowerCase()) && styles.activeLanguageButton]}
                            onPress={() => handleLanguageChange(lang.toLowerCase() as Language)}
                        >
                            <Text
                                style={[styles.languageButtonText, language?.includes(lang.toLowerCase()) && styles.activeLanguageButtonText]}>{lang}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={[styles.setting, styles.deleteDataContainer]}>
                <TouchableOpacity
                    style={[styles.languageButton, styles.deleteDataButton]}
                    onPress={handleDeleteData}
                >
                    <Text style={styles.deleteDataButtonText}>{t("screen.settings.deleteData")}</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40
    },
    setting: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },
    label: {
        fontSize: 18
    },
    languageOptions: {
        flexDirection: "row"
    },
    languageButton: {
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: "#D2D2D4",
        borderRadius: 5
    },
    activeLanguageButton: {
        backgroundColor: "#007AFF"
    },
    activeLanguageButtonText: {
        color: "white"
    },
    languageButtonText: {
        fontSize: 16,
        color: "#767577"
    },
    deleteDataContainer: {
        justifyContent: "center"
    },
    deleteDataButton: {
        backgroundColor: "#FF3B30",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    deleteDataButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default SettingsScreen;
