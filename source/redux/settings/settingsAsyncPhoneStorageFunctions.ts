import { createAsyncThunk } from "@reduxjs/toolkit";
import { PhoneStorage } from "../../api/PhoneStorage.ts";
import { ThemeType } from "./settingsTypes.ts";

export const saveThemeAsync = createAsyncThunk(
    "settings/saveTheme",
    async (theme: ThemeType, { rejectWithValue }) => {
        try {
            await PhoneStorage.saveTheme(theme);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getThemeAsync = createAsyncThunk(
    "settings/getTheme",
    async (_, { rejectWithValue }) => {
        try {
            return await PhoneStorage.getTheme();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearThemeAsync = createAsyncThunk(
    "settings/clearTheme",
    async (_, { rejectWithValue }) => {
        try {
            await PhoneStorage.clearTheme();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const saveLanguageAsync = createAsyncThunk(
    "settings/saveLanguage",
    async (language: string, { rejectWithValue }) => {
        try {
            await PhoneStorage.saveLanguage(language);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)

export const getLanguageAsync = createAsyncThunk(
    "settings/getLanguage",
    async (_, { rejectWithValue }) => {
        try {
            return await PhoneStorage.getLanguage();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearLanguageAsync = createAsyncThunk(
    "settings/clearLanguage",
    async (_, { rejectWithValue }) => {
        try {
            await PhoneStorage.clearLanguage();
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)
