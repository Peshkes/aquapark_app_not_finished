import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    darkView:{
        position: 'relative',
        flex: 1,
        backgroundColor: 'black',
    },
    lightView:{
        position: 'relative',
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stackSubView: {
        flex: 1
    },
    darkText: {
        color: '#fcfcfc',
    },
    lightText: {
        color: 'black',
    },
    darkInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 5,
        color: "white",
    },
    lightInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginVertical: 5,
        color: "black",
    },
    darkErrorText: {
        color: "#ff6868",
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 6,
        textAlign: "center"
    },
    lightErrorText: {
        color: "#be4242",
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 6,
        textAlign: "center"
    },
    darkStatusBar: {
        color: "light-content"
    },
    lightStatusBar: {
        color: "dark-content"
    }
});
