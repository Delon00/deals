import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link,router } from 'expo-router';
import { Firestore } from 'firebase/firestore';

export default function OTPScreen() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const [otpValues, setOtpValues] = useState(['', '', '', '', '']); // Array to store OTP values
    const inputRefs = useRef([]);
    const handlePressTerms = () => {
        Linking.openURL('https://www.example.com/terms');
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
                        <Text style={[styles.text, { color: textColor}]}>Je n'ai pas reçu de code!  
                            <Text style={styles.link} onPress={handlePressTerms}> Renvoyer </Text>
                        </Text>
                    </View>
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
        borderColor:'gray',
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
        justifyContent: 'center'
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
        alignItems: 'center'
    },
});
