import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function PasswordScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    
    const params = useLocalSearchParams();
    const { phoneNumber } = params;

    const [passwordValues, setPasswordValues] = useState(['', '', '', '']);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('nom, prenom')
                    .eq('userphone', phoneNumber)
                    .single();
                
                if (error) {
                    console.error('Erreur lors de la vérification de l\'utilisateur:', error.message);
                    return;
                }

                if (!data) {
                    setNom('');
                    setPrenom('');
                } else {
                    setNom(data.nom || '');
                    setPrenom(data.prenom || '');
                }
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', error.message);
            }
        };

        if (phoneNumber) {
            checkUserExists();
        }
    }, [phoneNumber]);

    const handleTextChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const updatedPasswordValues = [...passwordValues];
            updatedPasswordValues[index] = value;
            setPasswordValues(updatedPasswordValues);

            // Déplacer le focus vers le champ suivant ou précédent en fonction de l'action
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

    const handlePasswordChange = async () => {
        const newPassword = passwordValues.join('');
        
        try {
            const { user, error } = await supabase.auth.update({
                password: newPassword,
            });
            if (user) {
                router.push('/home');  // Redirige vers la page d'accueil ou toute autre page après la mise à jour du mot de passe
            } else {
                console.error('Échec de la mise à jour du mot de passe :', error);
            }
        } catch (error) {
            console.error('Erreur de mise à jour du mot de passe', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>{nom === '' && prenom === '' ? 'Inscription d\'un nouvel utilisateur' : 'Définissez votre mot de passe'}</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>{nom === '' && prenom === '' ? 'Veuillez compléter les informations ci-dessous pour créer votre compte.' : 'Veuillez entrez votre mot de passe afin de vous connecter'}</Text>
                    {nom === '' && prenom === '' && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nom:</Text>
                            <TextInput
                                style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                                onChangeText={setNom}
                                value={nom}
                                placeholder="Nom"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            />
                            <Text style={styles.label}>Prénom:</Text>
                            <TextInput
                                style={[styles.textInput, {  color: textColor, borderColor: textColor }]}
                                onChangeText={setPrenom}
                                value={prenom}
                                placeholder="Prénom"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            />
                        </View>
                    )}
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
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <Pressable style={styles.button} onPress={handlePasswordChange}>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#D3AF77',
        marginBottom: 5,
    },
});
