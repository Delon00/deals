import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function PasswordScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

    const params = useLocalSearchParams();
    const { phoneNumber } = params;

    const [passwordValues, setPasswordValues] = useState(['', '', '', '']);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [nomError, setNomError] = useState('');
    const [prenomError, setPrenomError] = useState('');
    const [passwordValuesError, setPasswordValuesError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const inputRefs = useRef([]);



    const handleTextChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const updatedPasswordValues = [...passwordValues];
            updatedPasswordValues[index] = value;
            setPasswordValues(updatedPasswordValues);
            if (value !== '') {
                if (index < passwordValues.length - 1) {
                    inputRefs.current[index + 1]?.focus();
                }
            } else {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
            }
        }
    };

    const handlePassword = async () => {
        const newPassword = passwordValues.join('');

        if (nom.length === 0) {
            setNomError('Veuillez entrer votre nom');
        } else {
            setNomError('');
        }

        if (prenom.length === 0) {
            setPrenomError('Veuillez entrer votre prénom');
        } else {
            setPrenomError('');
        }

        if (newPassword.length < 4) {
            setPasswordValuesError('Veuillez entrer un mot de passe à 4 chiffres');
        } else {
            setPasswordValuesError('');
        }

        if (nom.length === 0 || prenom.length === 0 || newPassword.length < 4) {
            return;
        }

        try {
            const hashedPassword = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                newPassword
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
                    router.push('../(tabs)');
                } else {
                    setPasswordValuesError('Mot de passe incorrect');
                    // Réinitialiser les champs de mot de passe
                    setPasswordValues(['', '', '', '']);
                    inputRefs.current[0]?.focus(); // Mettre le focus sur le premier champ de mot de passe
                }
            } else {
                const { data, error } = await supabase
                    .from('users')
                    .insert([
                        { userphone: phoneNumber, nom: nom, prenom: prenom, password: hashedPassword, created_at: new Date() },
                    ])
                    .select()
                    .single();

                if (error) {
                    console.error('Erreur lors de l\'insertion :', error.message);
                } else {
                    console.log('Nouvelle ligne insérée avec succès !');
                    await AsyncStorage.setItem('usertoken', data.user_id);
                    router.push('../(tabs)');
                }
            }
        } catch (error) {
            console.error('Erreur lors de la gestion du mot de passe', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>Inscription d'un nouvel utilisateur</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>Veuillez compléter les informations ci-dessous pour créer votre compte</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom:</Text>
                            <TextInput style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                                onChangeText={setNom}
                                value={nom}
                                placeholder="Nom"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            />
                            {nomError ? <Text style={styles.errorText}>{nomError}</Text> : null}
                            <Text style={styles.label}>Prénom:</Text>
                            <TextInput style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                                onChangeText={setPrenom}
                                value={prenom}
                                placeholder="Prénom"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            />
                            {prenomError ? <Text style={styles.errorText}>{prenomError}</Text> : null}
                        </View>
                    <Text style={styles.label}>Créez votre mot de passe à 4 chiffres</Text>
                    <View style={styles.passwordContainer}>
                        {passwordValues.map((value, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[styles.otpInput, { color: textColor }]}
                                onChangeText={(text) => handleTextChange(index, text)}
                                value={value ? '*' : ''}
                                keyboardType="numeric"
                                maxLength={1}
                                placeholder="*"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                                secureTextEntry={true}
                                textContentType="oneTimeCode"
                                autoComplete="sms-otp"
                            />
                        ))}
                    </View>
                    {passwordValuesError ? <Text style={styles.errorText}>{passwordValuesError}</Text> : null}
                </View>
                <View style={styles.BtnView}>
                    <Pressable style={styles.button} onPress={handlePassword}>
                        <Text style={styles.buttonText}>Terminé</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    middle: {
        marginTop: 50,
        paddingHorizontal: 20,
    },
    middleTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#D3AF77',
    },
    middleText: {
        marginVertical: 10,
    },
    inputContainer: {
        marginTop: 20,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        marginTop: 5,
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'gray',
        fontSize: 24,
        textAlign: 'center',
    },
    BtnView: {
        width: '100%',
        position: 'absolute',
        bottom: 60,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#D3AF77',
        paddingVertical: 12,
        marginHorizontal: 50,
        paddingHorizontal: 80,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        fontSize: 15,
        color: '#D3AF77',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 30,
        textAlign: 'center',
    },
});
