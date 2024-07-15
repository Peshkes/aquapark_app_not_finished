import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrScanScreen from "../screens/admin/QrScanScreen.tsx";
import { globalStyles } from "../styles/globalStyles.ts";
import { useAppSelector } from "../redux/store.ts";
import { useTranslation } from "react-i18next";
import CreateBraceletsScreen from "../screens/admin/CreateBraceletsScreen.tsx";
import OrderInformationScreen from "../screens/admin/OrderInformationScreen.tsx";

const Stack = createNativeStackNavigator();

const StackQrScan = () => {
    const { t } = useTranslation();
    const { themeType } = useAppSelector(state => state.settings);
    return (
        <Stack.Navigator initialRouteName={"QRScan"} screenOptions={{
            headerStyle: {
                backgroundColor: globalStyles[`${themeType}View`].backgroundColor
            },
            headerTintColor: globalStyles[`${themeType}Text`].color,
            headerTitleStyle: {
                fontWeight: "bold"
            },
            headerShadowVisible: false
        }}>
            <Stack.Screen name={"QR Scan"} component={QrScanScreen}
                          options={{ headerTitle: t("stack.qrScan.qrScan") }} />
            <Stack.Screen name={"Order Information"} component={OrderInformationScreen}
                          options={{ headerTitle: t("stack.qrScan.orderInformationScreen") }} />
            <Stack.Screen name={"Create Bracelets"} component={CreateBraceletsScreen}
                          options={{ headerTitle: t("stack.qrScan.createBraceletsScreen") }} />
        </Stack.Navigator>
    );
};

export default StackQrScan;
