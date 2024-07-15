import React from "react";
import { TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useAppSelector } from "../redux/store.ts";

const ThemedInput = (props: any) => {
    const {themeType} = useAppSelector(state => state.settings);
    return (
        <TextInput style={globalStyles[`${themeType}Input`]} {...props}></TextInput>
    );
};

export default ThemedInput;
