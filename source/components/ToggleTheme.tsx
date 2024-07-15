import React, { useContext } from "react";
import { TouchableNativeFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { toggleTheme } from "../redux/settings/settingsSlice.ts";
import { saveThemeAsync } from "../redux/settings/settingsAsyncPhoneStorageFunctions.ts";

const ToggleTheme = () => {
    const { themeType } = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();
    const onPressReaction = () => {
        dispatch(toggleTheme());
        dispatch(saveThemeAsync(themeType === 'light' ? 'dark' : 'light'));
    };
    return (
        <TouchableNativeFeedback
            onPress={() => {
                onPressReaction();
            }}
        >
            themeType === 'light' ? <Icon name="sunny" size={20} color="gray" /> : <Icon name="moon" size={20} color="gray" />
        </TouchableNativeFeedback>
    );
};

export default ToggleTheme;
