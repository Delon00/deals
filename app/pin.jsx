import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Platform } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import * as Crypto from 'expo-crypto';
import * as LocalAuthentication from 'expo-local-authentication';

export default PinCodeScreen = () => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDigitPress = (digit) => {
        const newPin = [...pin];
        const emptyIndex = newPin.findIndex((value) => value === '');

        if (emptyIndex !== -1) {
            newPin[emptyIndex] = digit;
            setPin(newPin);

            if (emptyIndex === 3) {
                validatePin(newPin.join(''));
            }
        }
    };

    const handleDeletePress = () => {
        const newPin = [...pin];
        const lastFilledIndex = newPin.slice().reverse().findIndex((value) => value !== '');
        const actualIndex = 3 - lastFilledIndex;

        if (lastFilledIndex !== -1) {
            newPin[actualIndex] = '';
            setPin(newPin);
        }
    };

    const handleForgetPress = () => {
        setModalVisible(true);
    };

    const validatePin = async (pin) => {
        try {
            const userToken = await AsyncStorage.getItem('usertoken'); // Récupère le userToken d'AsyncStorage
            if (!userToken) {
                alert('Utilisateur non connecté'); // Gérer le cas où le token n'est pas trouvé
                return;
            }

            // Hasher le code PIN entré par l'utilisateur
            const hashedPin = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                pin
            );

            // Récupérer le code PIN hashé depuis Supabase
            const { data, error } = await supabase
                .from('users')
                .select('password')
                .eq('user_id', userToken)
                .single();

            if (error) {
                alert('Erreur lors de la récupération du mot de passe'); // Gérer les erreurs de Supabase
                return;
            }

            const storedPin = data.password; // Supposant que le champ dans Supabase s'appelle 'password'

            // Comparer les hashes pour vérifier la validité du code PIN
            const isValid = hashedPin === storedPin;

            if (isValid) {
                // Naviguer vers la prochaine page si le code PIN est correct
                router.push('/(tabs)');
            } else {
                alert('Mot de passe incorrect');
                setPin(['', '', '', '']);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    useEffect(() => {
        const biometricLogin = async () => {
            try {
                const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
                if (isBiometricAvailable) {
                    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
                    if (savedBiometrics) {
                        const result = await LocalAuthentication.authenticateAsync({
                            promptMessage: 'Connexion à Deals',
                            fallbackLabel: 'Entrez votre mot de passe',
                            disableDeviceFallback: Platform.OS === 'ios' ? true : false,
                        });
                        if (result.success) {
                            router.push('/(tabs)');
                        } else {
                            console.log('Biometric authentication failed');
                        }
                    } else {
                        console.log('No biometrics saved');
                    }
                } else {
                    console.log('Biometric hardware not available');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de la session:', error);
            }
        };
        biometricLogin();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Deals</Text>
            <Image source={require('@/assets/images/cadenas.png')} style={styles.logo} />
            <Text style={styles.title}>Entrez votre mot de passe</Text>
            <View style={styles.pinIndicatorContainer}>
                {pin.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.pinDot,
                            { backgroundColor: pin[index] ? '#D3AF77' : '#cbbda6' },
                        ]}
                    />
                ))}
            </View>
            <View style={styles.pinContainer}>
                <View style={styles.digitRow}>
                    {[1, 2, 3].map((digit) => (
                        <TouchableOpacity
                            key={digit}
                            style={styles.pinButton}
                            onPress={() => handleDigitPress(String(digit))}
                        >
                            <Text style={styles.pinButtonText}>{digit}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.digitRow}>
                    {[4, 5, 6].map((digit) => (
                        <TouchableOpacity
                            key={digit}
                            style={styles.pinButton}
                            onPress={() => handleDigitPress(String(digit))}
                        >
                            <Text style={styles.pinButtonText}>{digit}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.digitRow}>
                    {[7, 8, 9].map((digit) => (
                        <TouchableOpacity key={digit} style={styles.pinButton}
                            onPress={() => handleDigitPress(String(digit))}
                        >
                            <Text style={styles.pinButtonText}>{digit}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={[styles.digitRow, styles.digitRowZero]}>
                    <TouchableOpacity style={styles.pinButton} onPress={() => handleDigitPress('0')}>
                        <Text style={styles.pinButtonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                        <Feather name="delete" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.btnforgetpsw} onPress={handleForgetPress}>
                <Text style={styles.textforgetpsw}>mot de passe oublié</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.modalTitle}>Réinitialiser le mot de passe</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>Indisponible pour le moment.</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingBottom: 50,
    },
    logoText: {
        fontFamily: 'redRoseBold',
        fontSize: 60,
        color: '#D3AF77',
    },
    logo: {
        height: 90,
        width: 90,
        objectFit: 'cover',
        marginTop: 10,
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lexend',
    },
    textforgetpsw: {
        color: '#D3AF77',
        fontSize: 20,
    },
    pinIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 50,
    },
    pinDot: {
        width: 25,
        height: 25,
        borderRadius: 100,
        marginHorizontal: 10,
        backgroundColor: '#cbbda6',
    },
    pinContainer: {
        alignItems: 'center',
    },
    digitRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    digitRowZero: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 65,
        width: '100%',
    },
    pinButton: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
        marginHorizontal: 30,
    },
    pinButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
    },
    deleteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 39,
    },
    deleteButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    btnforgetpsw: {
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
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
        height: '30%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        marginTop: 20,
    },
    modalText: {
        color: '#fff',
        fontSize: 16,
    },
});