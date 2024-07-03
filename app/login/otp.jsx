import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router,useLocalSearchParams } from 'expo-router'; // Assurez-vous d'importer router depuis 'expo-router'
import { supabase } from '@/lib/supabase';

export default function OTPScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const params = useLocalSearchParams();
    const { phoneNumber } = params;
    const formattedPhoneNumber = `+225${phoneNumber}`;

    const [otpValues, setOtpValues] = useState(['', '', '', '', '','']);
    const [otpValuesError, setOtpValuesError] = useState('');
    const inputRefs = useRef([]);

    const confirmCode = async () => {
        try {
            // const otpCode = otpValues.join('');
            // const { data: { session }, error } = await supabase.auth.verifyOtp({
            //     phone: formattedPhoneNumber,
            //     token: otpCode,
            //     type: 'sms',
            // });
            // if (session) {
            //     router.push({pathname:"/login/password",params:{phoneNumber}});
            // } else {
            //     setOtpValuesError('le code OTP est incorrect')
            //     setOtpValues(['', '', '', '', '','']);
            //     inputRefs.current[0]?.focus();
            //     console.error('La vérification du OTP a échoué :', error);
            // }
            router.push({pathname:"/login/password",params:{phoneNumber}});
        } catch (error) {
            console.error('Erreur lors de la validation du code OTP :', error);
        }
    };

    const handleTextChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const updatedOtpValues = [...otpValues];
            updatedOtpValues[index] = value;
            setOtpValues(updatedOtpValues);

            // Déplacer le focus vers le champ suivant ou précédent en fonction de l'action
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

    const handleResendCode = async () => {
        try {
            const { error } = await supabase.auth.sendOtp({ phone: phoneNumber });
            if (error) {
                console.error('Erreur lors de l\'envoi du code OTP :', error);
            } else {
                console.log('Code OTP renvoyé avec succès.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi du code OTP :', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.main, { backgroundColor }]}>
                <View style={styles.middle}>
                    <Text style={styles.middleTitle}>Entrez le code OTP de vérification</Text>
                    <Text style={[styles.middleText, { color: textColor }]}>Un code de vérification vous a été envoyé sur le numéro {phoneNumber}. Veuillez le saisir pour continuer.</Text>
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
                    {otpValuesError ? <Text style={styles.errorText}>{passwordValuesError}</Text> : null}
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 30,
        textAlign:'center',
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
