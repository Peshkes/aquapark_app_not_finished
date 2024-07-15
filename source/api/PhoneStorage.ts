import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../redux/auth/authTypes.ts";
import { ThemeType } from "../redux/settings/settingsTypes.ts";

type UserData = {
    user: User | null;
    expirationTime: number;
}

export class PhoneStorage {
    static saveUser = async (user: User): Promise<void> => {
        const userData: UserData = {
            user: null,
            expirationTime: 0
        };
        const today = new Date();
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0, 0);
        userData.expirationTime = endOfToday.getTime();
        userData.user = user;
        try {
            const userDataString = JSON.stringify(userData);
            await AsyncStorage.setItem("userData", userDataString);
        } catch (error: any) {
            console.error("Error saving user:", error.message);
            throw new Error("Error saving user: " + error.message);
        }
    };

    static getUser = async (): Promise<User> => {
        try {
            const userString = await AsyncStorage.getItem("userData");
            let userData: UserData | null = null;
            if (userString) {
                userData = JSON.parse(userString);
                if (userData && userData.expirationTime && userData.expirationTime > Date.now()) {
                    return userData.user;
                } else {
                    await PhoneStorage.clearUser();
                    throw new Error("User expired");
                }
            } else {
                throw new Error("User not found");
            }
        } catch (error: any) {
            console.error("Error getting user:", error.message);
            throw new Error("Error getting user: " + error.message);
        }
    };

    static clearUser = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem("userData");
        } catch (error: any) {
            console.error("Error clearing user:", error.message);
            throw new Error("Error clearing user: " + error.message);
        }
    };

    static saveTheme = async (theme: ThemeType): Promise<void> => {
        try {
            await AsyncStorage.setItem("theme", theme);
        } catch (error: any) {
            console.error("Error saving theme:", error.message);
            throw new Error("Error saving theme: " + error.message);
        }
    };

    static getTheme = async (): Promise<ThemeType | null> => {
        try {
            const theme = await AsyncStorage.getItem("theme") as ThemeType;
            return theme || null;
        } catch (error: any) {
            console.error("Error getting theme:", error.message);
            throw new Error("Error getting theme: " + error.message);
        }
    };

    static clearTheme = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem("theme");
        } catch (error: any) {
            console.error("Error clearing theme:", error.message);
            throw new Error("Error clearing theme: " + error.message);
        }
    };

    static saveLanguage = async (language: string): Promise<void> => {
        try {
            await AsyncStorage.setItem("language", language);
        } catch (error: any) {
            console.error("Error saving language:", error.message);
            throw new Error("Error saving language: " + error.message);
        }
    };

    static getLanguage = async (): Promise<string | null> => {
        try {
            const language = await AsyncStorage.getItem("language") as string;
            return language || null;
        } catch (error: any) {
            console.error("Error getting language:", error.message);
            throw new Error("Error getting language: " + error.message);
        }
    };

    static clearLanguage = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem("language");
        } catch (error: any) {
            console.error("Error clearing language:", error.message);
            throw new Error("Error clearing language: " + error.message);
        }
    };
}
