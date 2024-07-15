import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useAppSelector } from "../redux/store.ts";

type Props = {
    style?: any
    children: any
}
const ThemedView = (props: Props) => {
    const {themeType} = useAppSelector(state => state.settings);
    return (
        <View style={{...globalStyles[`${themeType}View`], ...props.style}}>
            {props.children}
        </View>
    );
};

export default ThemedView;
