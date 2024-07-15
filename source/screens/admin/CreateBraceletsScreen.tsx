import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Alert, TextInput } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NFC } from "../../api/NFC.ts";
import { OrderAndTicketsResponse, TicketsByOrder } from "../../redux/actions/actionsTypes.ts";


const CreateBraceletsScreen = ({ route }: any) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [ticketTypes, setTicketTypes] = useState<TicketsByOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const payload: OrderAndTicketsResponse = route.params?.payload;
            if (payload) {
                setTicketTypes(payload.orderItems);
            }
        } catch (error: any) {
            console.error(error);
            Alert.alert(t('screen.createBracelets.fetchError'), error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemedView>
            {loading ? (
                <ThemedText>{t('screen.createBracelets.loading')}</ThemedText>
            ) : (
                <FlatList
                    data={ticketTypes}
                    renderItem={({ item }) => (
                        <View>
                            <ThemedText>{item.ticketType}</ThemedText>
                            <TextInput onChangeText={}></TextInput>
                            <Button
                                onPress={() => handleNfcScan(item)}
                                title={t('screen.createBracelets.program')}
                            />
                        </View>
                    )}
                    keyExtractor={(item) => item.orderItemId}
                />
            )}
        </ThemedView>
    );
};

export default CreateBraceletsScreen;

