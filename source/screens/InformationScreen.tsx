import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import {globalStyles} from "../styles/globalStyles";
import ThemedView from "../components/ThemedView";
import { NFC } from "../api/NFC.ts";
import ThemedText from "../components/ThemedText.tsx";

const InformationScreen = () => {
    const [text, setText] = useState<string>('I am ready');

    useEffect(() => {
        NFC.start();
        return NFC.cleanUp;
    }, [])

    const pressHandler = () => {
        NFC.readData().then(value => setText(value));
    }

    const testHandler = () => {
        NFC.readMifare().then(value => setText(value.toString));
    }

    return (
        <ThemedView>
            <ThemedText>{text}</ThemedText>
            <Button title={'Go!'} onPress={pressHandler}></Button>
            <Button title={'Go Test!'} onPress={testHandler}></Button>
        </ThemedView>
    );
};

export default InformationScreen;
