import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import * as Crypto from 'expo-crypto';

export default PinCodeScreen = () => {
    const params = useLocalSearchParams();
    const { phoneNumber } = params;
    const [pin, setPin] = useState(['', '', '', '']);
    const [pinError, setPinError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const inputRefs = useRef([]);

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

    const validatePin = async (Password) => {
        try {
            const hashedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                Password
            );

            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('user_id, password')
                .eq('userphone', phoneNumber)
                .single();

            if (userError && userError.code !== 'PGRST116') {
                console.error('Erreur lors de la vérification de l\'utilisateur:', userError.message);
                return;
            }

            if (userData) {
                if (userData.password === hashedPassword) {
                    await AsyncStorage.setItem('usertoken', userData.user_id);
                    setPin(['', '', '', '']);
                    inputRefs.current[0]?.focus();
                    router.push('/(tabs)'); // Correction: 'tabs' au lieu de '(tabs)'
                } else {
                    alert('Mot de passe incorrect');
                    setPin(['', '', '', '']);
                }
            } else {
                console.error('Utilisateur non trouvé.');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>Deals</Text>
            <Image source={require('@/assets/images/cadenas.png')} style={styles.logo} />
            <Text style={styles.title}>Entrez votre mot de passe</Text>
            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}
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
                        <TouchableOpacity
                            key={digit}
                            style={styles.pinButton}
                            onPress={() => handleDigitPress(String(digit))}
                        >
                            <Text style={styles.pinButtonText}>{digit}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={[ styles.digitRowZero]}>
                    <TouchableOpacity style={styles.pinButton} onPress={() => handleDigitPress('0')}>
                        <Text style={styles.pinButtonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                        <Feather name="delete" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.btnforgetpsw} onPress={handleForgetPress}>
                <Text style={styles.textforgetpsw}>Mot de passe oublié</Text>
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
        fontSize: 30,
        color: '#D3AF77',
    },
    logo: {
        height: 90,
        width: 90,
        resizeMode: 'cover',
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
        paddingHorizontal:65,
        width:'100%'
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
    btnforgetpsw: {marginBottom:30,},
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
    errorText:{
        color:'red',
    }
});
