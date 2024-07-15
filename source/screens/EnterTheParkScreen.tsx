import React, {useEffect, useState} from 'react';
import {Button} from "react-native";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import {NFC} from "../api/NFC";

const EnterTheParkScreen = () => {
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

export default EnterTheParkScreen;
