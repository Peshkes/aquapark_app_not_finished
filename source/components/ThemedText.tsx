import React from "react";
import { Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { TextType } from "../styles/styleTypes";
import { useAppSelector } from "../redux/store.ts";

type Props = {
    children: any,
    style?: TextType | any
}
const ThemedText = (props: Props) => {
    const {themeType} = useAppSelector(state => state.settings);
    return (
        <Text style={{...globalStyles[`${themeType}Text`], ...props.style}}>{props.children}</Text>
    );
};

export default ThemedText;
