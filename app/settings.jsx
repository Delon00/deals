import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function SettingsScreen() {

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('usertoken');
            Alert.alert("Déconnexion réussie", "Vous avez été déconnecté.");
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>
            <Button title="Déconnexion" onPress={handleLogout} color="#D3AF77" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
