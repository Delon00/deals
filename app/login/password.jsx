import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function PasswordScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const { phoneNumber } = usePhoneNumber();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            console.error("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            const { user, error } = await supabase.auth.update({
                password: password,
            });
            if (user) {
                router.push('/home');  // Redirige vers la page d'accueil ou toute autre page après la mise à jour du mot de passe
            } else {
                console.error('Password update failed:', error);
            }
        } catch (error) {
            console.error('Erreur de mise à jour du mot de passe', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>Définissez votre mot de passe</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>Veuillez entrer un nouveau mot de passe pour sécuriser votre compte.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nouveau mot de passe</Text>
                        <TextInput
                            style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                            onChangeText={setPassword}
                            value={password}
                            placeholder={'Nouveau mot de passe'}
                            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            secureTextEntry
                        />
                        <Text style={styles.label}>Confirmer le mot de passe</Text>
                        <TextInput
                            style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder={'Confirmer le mot de passe'}
                            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <Pressable style={styles.button} onPress={handlePasswordChange}>
                        <Text style={styles.buttonText}>Mettre à jour</Text>
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
    },
    text: {
        fontSize: 15,
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
