import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Language, ThemeType } from "./settingsTypes";
import {
    clearLanguageAsync,
    clearThemeAsync, getLanguageAsync,
    getThemeAsync,
    saveLanguageAsync,
    saveThemeAsync
} from "./settingsAsyncPhoneStorageFunctions";
import { ReduxStatus } from "../auth/authTypes";
import i18next from 'i18next';

export type ThemeState = {
    themeType: ThemeType;
    status: ReduxStatus;
    statusDescription: string;
    language: Language;
}

const initialState: ThemeState = {
    themeType: "dark",
    status: "sleeping",
    statusDescription: "",
    language: "en"
};

export const settingsSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            if (state.language !== action.payload) {
                state.language = action.payload;
                i18next.changeLanguage(action.payload);
            }
        },
        setTheme: (state, action: PayloadAction<ThemeType>) => {
            if (state.themeType !== action.payload) {
                state.themeType = action.payload;
            }
        },
        toggleTheme: (state) => {
            state.themeType = state.themeType === "light" ? "dark" : "light";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveThemeAsync.pending, (state) => {
                state.statusDescription = "Saving theme...";
                state.status = "loading";
            })
            .addCase(saveThemeAsync.fulfilled, (state) => {
                state.statusDescription = "Theme saved successfully";
                state.status = "succeeded";
            })
            .addCase(saveThemeAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getThemeAsync.pending, (state) => {
                state.statusDescription = "Loading theme...";
                state.status = "loading";
            })
            .addCase(getThemeAsync.fulfilled, (state, action) => {
                state.statusDescription = "Theme loaded successfully";
                state.status = "succeeded";
                state.themeType = action.payload as ThemeType;
            })
            .addCase(getThemeAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(clearThemeAsync.pending, (state) => {
                state.statusDescription = "Clearing theme...";
                state.status = "loading";
            })
            .addCase(clearThemeAsync.fulfilled, (state) => {
                state.statusDescription = "Theme cleared successfully";
                state.status = "succeeded";
            })
            .addCase(clearThemeAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(saveLanguageAsync.pending, (state) => {
                state.statusDescription = "Saving language...";
                state.status = "loading";
            })
            .addCase(saveLanguageAsync.fulfilled, (state) => {
                state.statusDescription = "Language saved successfully";
                state.status = "succeeded";
            })
            .addCase(saveLanguageAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(getLanguageAsync.pending, (state) => {
                state.statusDescription = "Loading language...";
                state.status = "loading";
            })
            .addCase(getLanguageAsync.fulfilled, (state, action) => {
                state.statusDescription = "Language loaded successfully";
                state.status = "succeeded";
                if (i18next.language !== action.payload)
                    state.language = action.payload as Language;
                if (i18next.language !== action.payload)
                    i18next.changeLanguage(action.payload as Language);
            })
            .addCase(getLanguageAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            })
            .addCase(clearLanguageAsync.pending, (state) => {
                state.statusDescription = "Clearing language...";
                state.status = "loading";
            })
            .addCase(clearLanguageAsync.fulfilled, (state) => {
                state.statusDescription = "Language cleared successfully";
                state.status = "succeeded";
            })
            .addCase(clearLanguageAsync.rejected, (state, action) => {
                state.statusDescription = String(action.payload);
                state.status = "failed";
            });
    }
});

export const { setTheme, toggleTheme, setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
