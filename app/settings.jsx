import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, useColorScheme, Platform,Pressable,Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleThemeSelection = (theme) => {
        // Logique pour changer le thème de l'application
        console.log(`Thème sélectionné : ${theme}`);
        setModalVisible(false);
    };

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
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment vous déconnecter ?",
            [
                {
                    text: "Annuler",
                    onPress: () => console.log("Déconnexion annulée"),
                    style: "cancel"
                },
                {
                    text: "Oui",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('usertoken');
                            Alert.alert("Déconnexion réussie", "Vous avez été déconnecté.");
                            router.push('/login');
                        } catch (error) {
                            console.error('Erreur lors de la déconnexion :', error);
                        }
                    }
                }
            ]
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Pressable style={styles.backBtn} onPress={router.back}>
                    <Ionicons name="arrow-back" size={24} color={textColor} style={styles.icon} />
                    <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
                </Pressable>
            <Text style={[styles.labelBloc, { color: textColor }]}>Chargement des informations...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Pressable style={styles.backBtn} onPress={router.back}>
                    <Ionicons name="arrow-back" size={24} color={textColor} style={styles.icon} />
                    <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
                </Pressable>
                <Text style={[styles.labelBloc, { color: textColor }]}>Erreur : {error}</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Pressable style={styles.backBtn} onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color={textColor} style={styles.icon} />
                <Text style={[styles.title, { color: textColor }]}>Paramètres</Text>
            </Pressable>
            
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
            <Text style={[styles.labelBloc, { color: textColor }]}>Application</Text>
            <View style={[styles.bloc, { backgroundColor: backgroundBlocColor }]}>
                <View style={styles.rowBloc}>
                    <View style={styles.rowLeft}>
                        <Ionicons name="sunny" size={24} color={textColor} style={styles.icon} />
                        <Text style={[styles.labelText, { color: textColor }]}>Theme de l'app.</Text>
                    </View>
                    <Pressable style={styles.button} onPress={handlePress}>
                        <Text style={[styles.labelText, { color: textColor }]}></Text>
                        <FontAwesome name="chevron-right" size={15} color={textColor} style={[styles.icon,styles.detailText]} />
                    </Pressable>
                </View>
                <Bar/>
                <View style={styles.rowBloc}>
                    <View style={styles.rowLeft}>
                        <Ionicons name="notifications" size={22} color={textColor} style={styles.icon} />
                        <Text style={[styles.labelText, { color: textColor }]}>Notification</Text>
                    </View>
                    <FontAwesome name="chevron-right" size={15} color={textColor} style={[styles.icon,styles.detailText]} />
                </View>
            </View>
            <View style={[styles.bloc, { backgroundColor: backgroundBlocColor }]}>
                <View style={styles.rowLeft}>
                    <FontAwesome name="sign-out" size={24} color="red" style={styles.icon} />
                    <Pressable style={styles.button} onPress={handleLogout}>
                        <Text style={[styles.labelText, { color: 'red' }]}>Déconnexion</Text>
                    </Pressable>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent,{ backgroundColor: backgroundBlocColor }]}>
                        <Text style={[styles.modalTitle,{ color: textColor }]}>Choisir le thème</Text>
                        <Pressable style={styles.modalButton} onPress={() => handleThemeSelection('system')}>
                            <Text style={styles.modalButtonText}>Système</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={() => handleThemeSelection('light')}>
                            <Text style={styles.modalButtonText}>Clair</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={() => handleThemeSelection('dark')}>
                            <Text style={styles.modalButtonText}>Sombre</Text>
                        </Pressable>
                        <Pressable style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCloseButtonText}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
        marginHorizontal:10,
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
        borderRadius: 15,
        padding: 16,
        marginBottom: 20,
    },
    labelBloc: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#D3AF77',
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
    backBtn:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    button:{
        flexDirection:'row',
        alignItems:'center'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
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
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width:110,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#D3AF77',
    },
    modalButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign:'center',
    },
    modalCloseButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#ff4d4d',
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: 'white',
    },

});
