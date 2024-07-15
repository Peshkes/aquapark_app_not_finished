import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Alert, Platform } from "react-native";

export class NFC {
    static start = () => {
        NfcManager.start();
    };
    static cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    };

    static readMifare = async () => {
        let mifarePages: any[] = [];

        try {
            // STEP 1
            let reqMifare = await NfcManager.requestTechnology(
                NfcTech.MifareUltralight
            );

            const readLength = 60;
            const mifarePagesRead = await Promise.all(
                [...Array(readLength).keys()].map(async (_, i) => {
                    const pages = await NfcManager.mifareUltralightHandlerAndroid // STEP 2
                        .mifareUltralightReadPages(i * 4); // STEP 3
                    mifarePages.push(pages);
                })
            );
        } catch (ex) {
            console.warn(ex);
        } finally {
            // STEP 4
            NfcManager.cancelTechnologyRequest();
        }
        Alert.alert(mifarePages.toString());
        return mifarePages;
    };

    static readData = async () => {
        try {
            const tech = Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.NfcA;
            await NfcManager.requestTechnology(tech, { alertMessage: "Ready to magic" });
            const command = Platform.OS === "ios" ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;
            let response = await command([0x3a, 4, 4]);
            const payloadLength = parseInt(response.toString().split(",")[1]);
            const payloadPages = Math.ceil(payloadLength / 4);
            const startPage = 5;
            const endPage = startPage + payloadPages - 1;

            response = await command([0x3A, startPage, endPage]);
            const bytes = response.toString().split(",");
            let text = "";

            for (let i = 0; i < bytes.length; i++) {
                if (i < 5) {
                    continue;
                }
                if (parseInt(bytes[i]) === 254) {
                    break;
                }
                text = text + String.fromCharCode(parseInt(bytes[i]));
            }

            this.cleanUp();
            return text;
        } catch (error: any) {
            this.cleanUp();
            return error.message;
        }
    };
}
