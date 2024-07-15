import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ThemedView from "../components/ThemedView";
import { useAppDispatch } from "../redux/store.ts";
import { getWhoIsIn } from "../redux/actions/actionsAsyncFunctions.ts";
import { WhoIsInResponseItem } from "../redux/actions/actionsTypes.ts";

const WhoIsInsideScreen = () => {
    const dispatch = useAppDispatch();
    const [data, setData] = useState<WhoIsInResponseItem[]>([]);
    const [flag, setFlag] = useState<boolean>(false);
    useEffect(() => {
        dispatch(getWhoIsIn()).then(
            (res) => {
                if (res.type === "actions/getWhoIsIn/fulfilled") {
                    setData(res.payload);
                }
            }
        );
    }, [flag]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlag(!flag);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }: { item: WhoIsInResponseItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Ticket Type: {item.ticketType}</Text>
            <Text style={styles.itemText}>Time Left: {item.timeLeft} minutes</Text>
            <Text style={styles.itemText}>Extra: {item.extra}</Text>
        </View>
    );

    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Is empty</Text>
        </View>
    );

    return (
        <ThemedView>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={data.length === 0 ? styles.emptyListContainer : styles.listContainer}
                ListEmptyComponent={renderEmptyComponent}
            />
        </ThemedView>
    );
};


const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16
    },
    itemContainer: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2
    },
    itemText: {
        fontSize: 16,
        marginBottom: 4
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        fontSize: 18,
        color: "gray"
    }
});

export default WhoIsInsideScreen;
