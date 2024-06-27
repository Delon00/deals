import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme,Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter,Link } from 'expo-router';

export default function Login() {
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const router = useRouter();
    const [text, setText] = useState('');

    const handleTextChange = (input) => {
    // Basic phone number validation: only numbers and length between 10-15
    const validPhoneNumber = /^[0-9]{0,10}$/; // Limit to exactly 10 digits
    if (validPhoneNumber.test(input) || input === '') {
        setText(input);
        }
    };


    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.main, { backgroundColor }]}>
            <View style={styles.header}>
                <FontAwesome
                    name="arrow-left"
                    size={20}
                    color={textColor}
                    style={styles.backIcon}
                    onPress={() => router.back()}
                />
                <Text style={[styles.headerText, { color: textColor }]}>Retour</Text>
            </View>
            <View style={styles.middle}>
                <Text style={[styles.middleTitle, { color: textColor }]}>Entrez votre numéro de téléphone</Text>
                <Text style={[styles.middleText, { color: textColor }]}>Veuillez entrer votre numéro de téléphone pour accéder à nos services.</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label }>Numéro de téléphone</Text>
                    <TextInput
                        style={[styles.textInput, { color: textColor, borderColor: textColor }]}
                        onChangeText={handleTextChange}
                        value={text}
                        placeholder={'0123401676'}
                        placeholderTextColor={colorScheme === 'dark' ? '#888' : '#ccc'}
                        keyboardType="phone-pad"
                        maxLength={10} // Set max length to 10 digits
                    />
                </View>
            </View>
                <View style={styles.BtnView}>
                    <Link href="/login" asChild style={styles.button}>
                        <Pressable><Text style={styles.buttonText}>Suivant</Text></Pressable>
                    </Link>
                </View>

        </View>
    </TouchableWithoutFeedback>
);
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 80,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  backIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  middle: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  middleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical:10,
  },
  middleText: {
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 20,
    marginHorizontal:5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color:'#6e6e6e',
    fontWeight:'bold',
  },
  textInput: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    },
    BtnView:{
        width:'100%',
        position: 'absolute',
        bottom: 60,
        justifyContent:'center'
    },
    button: {
        backgroundColor: '#D3AF77',
        paddingVertical: 12,
        marginHorizontal:50,
        paddingHorizontal: 100,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'SpaceMono',
        textAlign:'center',
    },
});
