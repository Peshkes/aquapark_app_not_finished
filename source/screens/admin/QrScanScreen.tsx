import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, Platform, StyleSheet, TextInput, View } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import ThemedView from "../../components/ThemedView";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import ThemedText from "../../components/ThemedText.tsx";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store.ts";
import { setStatus, setStatusDescription } from "../../redux/auth/authSlice.ts";
import { getOrderAndTickets } from "../../redux/actions/actionsAsyncFunctions.ts";
import { useNavigation } from "@react-navigation/native";

const QrScanScreen = () => {

    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {navigate} = useNavigation();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [text, setText] = useState(t('screen.qrScan.ready'));
    const [hasCamera, setHasCamera] = useState<boolean | null>(null);
    const coverOpacity = useRef(new Animated.Value(1)).current;
    const [tmpSolution, setTmpSolution] = useState("")

    useEffect(() => {
        checkCameraAvailability();
        requestCameraPermission();
    }, []);

    const checkCameraAvailability = async () => {
        let permission;
        if (Platform.OS === 'ios') {
            permission = PERMISSIONS.IOS.CAMERA;
        } else if (Platform.OS === 'android') {
            permission = PERMISSIONS.ANDROID.CAMERA;
        }
        if (permission){
            const result = await check(permission);
            if (result === RESULTS.UNAVAILABLE) {
                setHasCamera(false);
            } else {
                setHasCamera(true);
            }
        }
    };

    const requestCameraPermission = async () => {
        let result;
        if (Platform.OS === 'ios') {
            result = await request(PERMISSIONS.IOS.CAMERA);
        } else if (Platform.OS === 'android') {
            result = await request(PERMISSIONS.ANDROID.CAMERA);
        }

        if (result === RESULTS.GRANTED) {
            setHasPermission(true);
        } else {
            setHasPermission(false);
        }
    };

    const handleBarcodeScan = ({ data }: { data: string }) => {
        setIsScanning(false);
        try {
            dispatch(getOrderAndTickets(data))
                .then(
                    response => {
                        if (response.type === "actions/getOrderAndTickets/fulfilled") {
                            navigate('Order Information' as never, {orderAndTickets: response.payload} as never);
                        }
                    }
                );
        } catch (e: any){
            dispatch(setStatusDescription(e.message));
            dispatch(setStatus("failed"));
        }

    };

    const startScanning = () => {
        setIsScanning(true);
        setText(t('screen.qrScan.scanning'));
        Animated.timing(coverOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const stopScanning = () => {
        Animated.timing(coverOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setIsScanning(false);
            setText(t('screen.qrScan.ready'));
        });
    };

    if (hasPermission === null || hasCamera === null) {
        return (
            <ThemedView style={globalStyles.container}>
                <ThemedText style={{...styles.text }}>
                    {t('screen.qrScan.checkingCamera')}
                </ThemedText>
            </ThemedView>
        );
    }

    if (!hasPermission) {
        return (
            <ThemedView style={globalStyles.container}>
                <ThemedText style={{...styles.text }}>
                    {t('screen.qrScan.noAccess')}
                </ThemedText>
                <Button title={t('screen.qrScan.allowCamera')} onPress={requestCameraPermission} />
            </ThemedView>
        );
    }

    if (!hasCamera) {
        return (
            <ThemedView style={globalStyles.container}>
                <ThemedText style={{...styles.text }}>
                    {t('screen.qrScan.noCamera')}
                </ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={globalStyles.container}>
            <View style={styles.barcodeBox}>
                {isScanning ? (
                    <QRCodeScanner
                        containerStyle={{ backgroundColor: "gray" }}
                        topViewStyle={{ backgroundColor: "gray" }}
                        onRead={({ data }) => handleBarcodeScan({ data })}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        reactivate={false}
                    />
                ) : (
                    <Animated.View style={[styles.cover, { opacity: coverOpacity }]} />
                )}
            </View>
            <View>
                <TextInput onChangeText={value => setTmpSolution(value)}/>
                <Button title={"tmpSolution"} onPress={()=>
                    handleBarcodeScan({data: tmpSolution})
                }/>
            </View>
            <ThemedText style={{...styles.text }}>{text}</ThemedText>

            {!isScanning && (
                <Button title={t('screen.qrScan.start')} onPress={startScanning} />
            )}
            {isScanning && (
                <Button title={t('screen.qrScan.stop')} onPress={stopScanning} />
            )}
        </ThemedView>
    );
};

export default QrScanScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        margin: 20,
    },
    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        marginBottom: 20,
    },
    cover: {
        height: '100%',
        width: '100%',
        backgroundColor: 'gray',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
