import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme, Pressable, Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { usePhoneNumber } from './phoneNumbercontext';
import { router } from 'expo-router';

export default function Login() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const { phoneNumber, setPhoneNumber } = usePhoneNumber();
    const [checked, setChecked] = useState(false);

    const handleTextChange = (input) => {
        const validPhoneNumber = /^[0-9]{0,10}$/;
        if (validPhoneNumber.test(input) || input === '') {
            setPhoneNumber(input);
        }
    };

    const signInWithPhoneNumber = async () => {
        try {
            const confirmation = await supabase.auth.signInWithOtp({ phone: phoneNumber });
            // Store confirmation if needed
            router.push('/login/otp');
        } catch (error) {
            console.log("error", error);
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
                        <TextInput
                            style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                            onChangeText={handleTextChange}
                            value={phoneNumber}
                            placeholder={'0123401676'}
                            placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.condition}>
                        <Checkbox checked={checked} onPress={() => setChecked(!checked)} />
                        <Text style={[styles.text, { color: textColor }]}>
                            J'accepte les
                            <Text style={styles.link} onPress={handlePressTerms}> termes et conditions d'utilisation </Text>
                            et la
                            <Text style={styles.link} onPress={handlePressPrivacy}> politique de confidentialité</Text>.
                        </Text>
                    </View>
                </View>
                <View style={styles.BtnView}>
                    <Link href="/login/otp" asChild style={styles.button} onPress={checked ? signInWithPhoneNumber : null}>
                        <Pressable>
                            <Text style={styles.buttonText}>Suivant</Text>
                        </Pressable>
                    </Link>
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
});
