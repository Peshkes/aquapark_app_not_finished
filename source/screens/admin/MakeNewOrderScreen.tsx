import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import ThemedView from "../../components/ThemedView.tsx";
import { useAppDispatch } from "../../redux/store.ts";
import { getTickets } from "../../redux/actions/actionsAsyncFunctions.ts";

interface TicketsByTypeResponse {
    type: string;
    description: string;
    institutionTickets: InstitutionTicket[];
}

interface InstitutionTicket {
    InstitutionTicketId: string;
    time: number;
    price: number;
}


const MakeNewOrderScreen = () => {
    const [ticketsByType, setTicketsByType] = useState<TicketsByTypeResponse[]>([]);
    const [counts, setCounts] = useState<{ [key: string]: number }>({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTickets()).then(
            (response) => {
                if (response.type === "actions/getTickets/fulfilled") {
                    setTicketsByType(response.payload as TicketsByTypeResponse[]);
                }
            }
        )
    }, []);

    const increment = (id: string) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: (prevCounts[id] || 0) + 1
        }));
    };

    const decrement = (id: string) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: Math.max((prevCounts[id] || 0) - 1, 0)
        }));
    };

    const renderTicket = ({ item }: { item: InstitutionTicket }) => (
        <View style={styles.ticketRow}>
            <Text style={styles.ticketText}>{item.time === 600 ? "Day" : `${item.time / 60}  hour${item.time > 1 ? 's' : ''}`}</Text>
            <Text style={styles.ticketText}>{item.price}₽</Text>
            <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => decrement(item.InstitutionTicketId)} style={styles.counterButton}>
                    <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{counts[item.InstitutionTicketId] || 0}</Text>
                <TouchableOpacity onPress={() => increment(item.InstitutionTicketId)} style={styles.counterButton}>
                    <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderTicketType = ({ item }: { item: TicketsByTypeResponse }) => (
        <View style={styles.ticketTypeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <FlatList
                data={item.institutionTickets}
                renderItem={renderTicket}
                keyExtractor={(ticket) => ticket.InstitutionTicketId}
            />
        </View>
    );

    return (
        <ThemedView style={styles.container}>
            <FlatList
                data={ticketsByType}
                renderItem={renderTicketType}
                keyExtractor={(item) => item.type}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    ticketTypeContainer: {
        backgroundColor: '#1f2d3d',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    typeText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },
    ticketRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    ticketText: {
        fontSize: 16,
        color: '#fff',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#34495e',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    counterButtonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 20,
    },
    counterText: {
        fontSize: 16,
        color: '#fff',
    }
});

export default MakeNewOrderScreen;
