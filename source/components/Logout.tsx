import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { logout } from "../redux/auth/authSlice.ts";
import { clearUserAsync } from "../redux/auth/authAsyncPhoneStorageFunctions.ts";
import Icon from "react-native-vector-icons/Ionicons";


const Logout = () => {
    const dispatch = useAppDispatch();
    const themeType = useAppSelector(state => state.settings.themeType);
    const onPressReaction = () => {
        dispatch(logout());
        dispatch(clearUserAsync());
    };
    return (
        <TouchableNativeFeedback
            onPress={() => {
                onPressReaction();
            }}
        >
            <Icon name={'power-outline'} size={20} color={themeType === 'light' ? 'black' : 'white'} />
        </TouchableNativeFeedback>
    );
};

export default Logout;
