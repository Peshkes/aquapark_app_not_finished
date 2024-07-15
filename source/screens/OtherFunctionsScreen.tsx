import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import ThemedView from "../components/ThemedView";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppSelector } from "../redux/store.ts";
import ThemedText from "../components/ThemedText.tsx";
import {useTranslation} from "react-i18next";

type Button = {
    title: string;
    screen?: string;
    function?: () => void;
    iconName: string;
};

const OtherFunctionsScreen = ({ route }: any) => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const { user } = useAppSelector((state) => state.auth);
    const source = route.params?.source;

    const functionButtons: Array<Button> = [
    ];

    const navigationButtons: Array<Button> = [
        { title: t('stack.adminOther.registration'), screen: 'Registration', iconName: 'person-add-outline' },
        { title: t('stack.adminOther.enter'), screen: 'Enter', iconName: 'log-in-outline' },
        { title: t('stack.adminOther.info'), screen: 'Information', iconName: 'information-circle-outline' },
        { title: t('stack.adminOther.leave'), screen: 'Leave', iconName: 'log-out-outline' },
    ];

    const allButtons: Array<Button> = source === 'admin' ? functionButtons.concat(navigationButtons) : functionButtons;

    return (
        <ThemedView style={globalStyles.stackSubView}>
            <View style={styles.userContainer}>
                <ThemedText style={styles.userName}>{user?.name}</ThemedText>
                {user?.roles.map(role => <ThemedText style={styles.userRole} key={role}>{role.slice(5)}</ThemedText>)}
            </View>
            <FlatList
                contentContainerStyle={styles.listContainer}
                numColumns={2}
                data={allButtons}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.title + "touch"}
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={() => (item.function ? item.function() : navigation.navigate(item.screen as never))}
                    >
                        <View style={styles.iconContainer} key={item.title + "view"}>
                            <Icon name={item.iconName} size={34} color="white" key={item.title + "icon"}/>
                        </View>
                        <Text style={styles.buttonText} key={item.title + "text"}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 16,
    },
    userName: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userRole: {
        color: 'white',
        fontSize: 14,
    },
    listContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#767577',
        padding: 16,
        margin: 8,
        borderRadius: 12,
    },
    iconContainer: {
        backgroundColor: '#6a6a6a',
        padding: 10,
        borderRadius: 50,
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OtherFunctionsScreen;
