import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, useColorScheme, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Bar } from '@/components/bar';

export default function SettingsScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? '#1c1c1c' : '#e7e6e8';
    const backgroundBlocColor = colorScheme === 'dark' ? '#000' : '#fff';

    const [userphone, setUserphone] = useState('');
    const [abonnement, setAbonnement] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserPhone();
    }, []);

    const fetchUserPhone = async () => {
        try {
            const usertoken = await AsyncStorage.getItem('usertoken');
            if (!usertoken) {
                setError('Utilisateur non connecté');
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .select('userphone, abonnement')
                .eq('user_id', usertoken)
                .single();

            if (error) {
                setError('Erreur lors de la récupération des données de l\'utilisateur');
            } else if (data) {
                setUserphone(data.userphone);
                setAbonnement(data.abonnement);
            }
        } catch (error) {
            setError('Erreur lors de la récupération des données');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('usertoken');
            Alert.alert("Déconnexion réussie", "Vous avez été déconnecté.");
            router.push('/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
                <Text style={[styles.labelBloc, { color: textColor }]}>Chargement des informations...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
                <Text style={[styles.labelBloc, { color: textColor }]}>Erreur : {error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
            <Text style={[styles.labelBloc, { color: textColor }]}>Compte</Text>
            <View style={[styles.bloc, { backgroundColor: backgroundBlocColor }]}>
                <View style={styles.rowBloc}>
                    <View style={styles.rowLeft}>
                        <FontAwesome name="phone" size={20} color={textColor} style={styles.icon} />
                        <Text style={[styles.labelText, { color: textColor }]}>Numéro</Text>
                    </View>
                    <Text style={[styles.detailText]}>+225 {userphone}</Text>
                </View>
                <Bar/>
                <View style={styles.rowBloc}>
                    <View style={styles.rowLeft}>
                        <FontAwesome name="tag" size={20} color={textColor} style={styles.icon} />
                        <Text style={[styles.labelText, { color: textColor }]}>Abonnement</Text>
                    </View>
                    <Text style={[styles.detailText]}>{abonnement}</Text>
                </View>
                <Bar/>
                <View style={styles.rowBloc}>
                    <View style={styles.rowLeft}>
                        <FontAwesome name="user" size={20} color={textColor} style={styles.icon} />
                        <Text style={[styles.labelText, { color: textColor }]}>Mes informations</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={15} color={textColor} style={[styles.icon,styles.detailText]} />
                </View>
            </View>
            <Button title="Déconnexion" onPress={handleLogout} color="#D3AF77" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bloc: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
        borderRadius: 20,
        padding: 16,
        marginBottom: 20,
    },
    labelBloc: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#D3AF77',
        marginTop: 20,
        marginBottom: 10,
        marginLeft:20,
    },
    rowBloc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    labelText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    detailText: {
        fontSize: 16,
        fontWeight: '500',
        color:'#D3AF77',
    },
});
