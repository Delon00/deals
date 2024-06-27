import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableWithoutFeedback, Keyboard, useColorScheme,Pressable,Linking } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome,Ionicons  } from '@expo/vector-icons';
import { useRouter,Link } from 'expo-router';
import { Checkbox } from '@/components/checkbox';

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
    const handlePressTerms = () => {
        Linking.openURL('https://www.example.com/terms');
        };
    
    const handlePressPrivacy = () => {
        Linking.openURL('https://www.example.com/privacy');
        };
    const [checked, setChecked] = useState(false);


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
                <Text style={styles.middleTitle}>Entrez votre numéro de téléphone</Text>
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
                        maxLength={10}
                    />
                </View>
                <View style={styles.condition}>
                    <Checkbox/>
                    <Text style={styles.text}>
                        J'accepte les 
                        <Text style={styles.link} onPress={handlePressTerms}> termes et conditions d'utilisation </Text>
                        et la 
                        <Text style={styles.link} onPress={handlePressPrivacy}> politique de confidentialité</Text>.
                    </Text>
                </View>
            </View>
                <View style={styles.BtnView}>
                    <Link href="/otp" asChild style={styles.button}>
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
    marginTop: 50,
    paddingHorizontal: 20,
  },
  middleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical:10,
    color:'#D3AF77',
  },
  middleText: {
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 25,
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
    text:{
        maxWidth:'90%',
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
    link: {
        color: '#D3AF77',
        textDecorationLine: 'underline',
    },
    condition:{

        marginVertical: 25,
        marginHorizontal:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    
});
