import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Login() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const handleTextChange = (input) => {
        const validPhoneNumber = /^[0-9]{0,10}$/;
        if (validPhoneNumber.test(input) || input === '') {
            setPhoneNumber(input);
        }
    };

    const signInWithPhoneNumber = async () => {
        if (phoneNumber.length === 0) {
            setPhoneNumberError('Veuillez entrer un numéro de téléphone');
        } else if (phoneNumber.length !== 10) {
            setPhoneNumberError('Ce numéro de téléphone n\'est pas pris en charge');
        } else {
            try {
                // const formattedPhoneNumber = `+225${phoneNumber}`;
                // const { data, error } = await supabase.auth.signInWithOtp({ phone: formattedPhoneNumber });
                // if (error) {
                //     console.error(error);
                //     setPhoneNumberError(`Erreur lors de l\'envoi du code OTP ${error}`);
                // } else {
                //     router.push({pathname:"/login/otp",params:{phoneNumber}});
                // }
                router.push({pathname:"/login/otp",params:{phoneNumber}});
            } catch (error) {
                console.log("error", error);
                setPhoneNumberError('Une erreur est survenue');
            }
        }
    };

    const handlePressTerms = () => { Linking.openURL('https://www.example.com/terms'); };
    const handlePressPrivacy = () => { Linking.openURL('https://www.example.com/privacy'); };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>Entrez votre numéro de téléphone</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>Veuillez entrer votre numéro de téléphone pour accéder à nos services.</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Numéro de téléphone</Text>
                        <TextInput style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                            onChangeText={handleTextChange}
                            value={phoneNumber}
                            placeholder={'0123401676'}
                            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <Pressable style={styles.button} onPress={signInWithPhoneNumber}>
                        <Text style={styles.buttonText}>Suivant</Text>
                    </Pressable>
                    <Text style={[styles.text, { color: textColor }]}>
                        En cliquant sur suivant vous acceptez les
                        <Text style={styles.link} onPress={handlePressTerms}> termes et conditions d'utilisation </Text>
                        et la
                        <Text style={styles.link} onPress={handlePressPrivacy}> politique de confidentialité</Text>.
                    </Text>
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
        textAlign: 'center',
        marginTop: 30,
        paddingHorizontal: 30,
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
    link: {
        color: '#D3AF77',
    },
    condition: {
        marginVertical: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#D3AF77',
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
