import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setStatus } from "../redux/auth/authSlice";

const StatusIndicator = ({ hasTabNavigator }: { hasTabNavigator: boolean }) => {
    const { status, statusDescription } = useSelector((state: RootState) => state.auth);
    const { themeType } = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (status === "failed" || status === "succeeded") {
            timeoutId = setTimeout(() => {
                dispatch(setStatus("sleeping"));
            }, 5000);
        }

        return () => clearTimeout(timeoutId); // Clear the timer on unmount or status change
    }, [status]);

    return (
        status !== "sleeping" ? (
            <View style={[styles.view, styles[`${themeType}_${status}`], hasTabNavigator ? styles.aboveTabNavigator : styles.noTabNavigator]}>
                {statusDescription && <Text style={[styles[`${themeType}_${status}`], styles.text]}>{statusDescription}</Text>}
            </View>
        ) : null
    );
};

export default StatusIndicator;

const styles = StyleSheet.create({
    view: {
        width: '100%',
        position: 'absolute',
    },
    text: {
        fontSize: 14,
        fontWeight: "bold"
    },
    dark_failed: {
        backgroundColor: "#82221C",
        color: "#D3B5B0",
    },
    light_failed: {
        backgroundColor: "#A82820",
        color: "white"
    },
    dark_succeeded: {
        backgroundColor: "#214E16",
        color: "#afbdae"
    },
    light_succeeded: {
        backgroundColor: "#367228",
        color: "white"
    },
    dark_loading: {
        backgroundColor: "#767577",
        color: "#d2c7c7"
    },
    light_loading: {
        backgroundColor: "#767577",
        color: "white"
    },
    aboveTabNavigator: {
        bottom: 85,
        padding: 20
    },
    noTabNavigator: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        bottom: 0,
    }
});
