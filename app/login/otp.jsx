import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { usePhoneNumber } from './phoneNumbercontext';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

export default function OTPScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const { phoneNumber } = usePhoneNumber();
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);

    const confirmCode = async () => {
        try {
            const otpCode = otpValues.join('');
            const { data: { session }, error } = await supabase.auth.verifyOtp({
                phone: phoneNumber,
                token: otpCode,
                type: 'sms',
            });
            if (session) {
                router.push('/login/password');
            } else {
                console.error('OTP verification failed:', error);
            }
        } catch (error) {
            console.error('Code invalide', error);
        }
    };

    const handleTextChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const updatedOtpValues = [...otpValues];
            updatedOtpValues[index] = value;
            setOtpValues(updatedOtpValues);

            // Move focus to the next input field or previous if deleting
            if (value !== '') {
                if (index < otpValues.length - 1) {
                    inputRefs.current[index + 1]?.focus();
                }
            } else {
                if (index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
            }
        }
    };

    const handleResendCode = () => {
        // Implémentez la logique pour renvoyer le code OTP
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>Entrez le code OTP de vérification</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>Un code de vérification vous a été envoyé. Veuillez le saisir pour continuer.</Text>
                    <View style={styles.otpContainer}>
                        {otpValues.map((value, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                style={[styles.otpInput, { color: textColor }]}
                                onChangeText={(text) => handleTextChange(index, text)}
                                value={value}
                                keyboardType="numeric"
                                maxLength={1}
                                placeholder="0"
                                placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            />
                        ))}
                    </View>
                    <View style={styles.condition}>
                        <Text style={[styles.text, { color: textColor }]}>
                            Je n'ai pas reçu de code!  
                            <Text style={styles.link} onPress={handleResendCode}> Renvoyer </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <Pressable style={styles.button} onPress={confirmCode}>
                        <Text style={styles.buttonText}>Vérifier</Text>
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 30,
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
    link: {
        color: '#D3AF77',
        textDecorationLine: 'none',
    },
    condition: {
        marginVertical: 25,
        marginHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
