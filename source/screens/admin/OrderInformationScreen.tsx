import React from "react";
import { Button, FlatList, View } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const OrderInformationScreen = ({route}: any) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const { orderAndTickets } = route.params;
    if (!orderAndTickets) {
        return (
            <ThemedView>
                <ThemedText>{t("screen.orderInformation.noPayload")}</ThemedText>
            </ThemedView>
        );
    }

    const handleNavigate = () => {
        navigation.navigate("Create Bracelets" as never, { orderAndTickets } as never);
    };

    return (
        <ThemedView>
            <View>
                <ThemedText>{orderAndTickets.order.datePaid}</ThemedText>
                <ThemedText>{orderAndTickets.order.sum}</ThemedText>
                <ThemedText>{orderAndTickets.order.status}</ThemedText>
            </View>
            <FlatList
                data={orderAndTickets.orderItems}
                renderItem={({ item, index }) => (
                    <ThemedText key={item.ticketType + index}>{item.ticketType} - {item.count}</ThemedText>
                )}
            />
            <View>
                <Button
                    onPress={handleNavigate}
                    title={t("screen.orderInformation.go")}
                />
                <Button
                    onPress={() => navigation.goBack()}
                    title={t("screen.orderInformation.nope")}
                />
            </View>
        </ThemedView>
    );
};

export default OrderInformationScreen;
