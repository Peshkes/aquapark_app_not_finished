import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { useAppSelector } from "../redux/store.ts";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";


const Settings = () => {
    const themeType = useAppSelector(state => state.settings.themeType);
    const navigation = useNavigation();

    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate('Settings' as never)}>
            <Icon name={'power-outline'} size={20} color={themeType === 'light' ? 'black' : 'white'} />
        </TouchableNativeFeedback>
    );
};

export default Settings;
