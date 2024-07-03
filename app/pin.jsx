import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import * as Crypto from 'expo-crypto';

export default PinCodeScreen = () => {

    const [pin, setPin] = useState(['', '', '', '']);
    const handleDigitPress = (digit) => {
    const newPin = [...pin];
    const emptyIndex = newPin.findIndex((value) => value === '');

    if (emptyIndex !== -1) {
            newPin[emptyIndex] = digit;
            setPin(newPin);

            if (emptyIndex === 3) {
                validatePin(newPin.join(''));
            }
        }
    };

    const handleDeletePress = () => {
        const newPin = [...pin];
        const lastFilledIndex = newPin.slice().reverse().findIndex((value) => value !== '');
        const actualIndex = 3 - lastFilledIndex;

        if (lastFilledIndex !== -1) {
        newPin[actualIndex] = '';
        setPin(newPin);
        }
    };

    const validatePin = async (pin) => {
        try {
            const userToken = await AsyncStorage.getItem('usertoken'); // Récupère le userToken d'AsyncStorage
            if (!userToken) {
                alert('Utilisateur non connecté'); // Gérer le cas où le token n'est pas trouvé
                return;
            }
    
            // Hasher le code PIN entré par l'utilisateur
            const hashedPin = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                pin
            );
    
            // Récupérer le code PIN hashé depuis Supabase
            const { data, error } = await supabase
                .from('users')
                .select('password')
                .eq('user_id', userToken)
                .single();
    
            if (error) {
                alert('Erreur lors de la récupération du mot de passe'); // Gérer les erreurs de Supabase
                return;
            }
    
            const storedPin = data.password; // Supposant que le champ dans Supabase s'appelle 'password'
    
            // Comparer les hashes pour vérifier la validité du code PIN
            const isValid = hashedPin === storedPin;
    
            if (isValid) {
                // Naviguer vers la prochaine page si le code PIN est correct
                router.push('/(tabs)');
            } else {
                alert('Mot de passe incorrect');
                setPin(['', '', '', '']);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    };
    

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Entrez votre mot de passe</Text>
        <View style={styles.pinIndicatorContainer}>
            {pin.map((_, index) => (
                <View key={index}style={[styles.pinDot,{ backgroundColor: pin[index] ? '#D3AF77' : '#cbbda6' }]}
            />))}
        </View>
        <View style={styles.pinContainer}>
            <View style={styles.digitRow}>
                {[1, 2, 3].map((digit) => (
                <TouchableOpacity
                key={digit}
                style={styles.pinButton}
                onPress={() => handleDigitPress(String(digit))}
                >
                <Text style={styles.pinButtonText}>{digit}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={styles.digitRow}>
          {[4, 5, 6].map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.pinButton}
              onPress={() => handleDigitPress(String(digit))}
            >
              <Text style={styles.pinButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.digitRow}>
          {[7, 8, 9].map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.pinButton}
              onPress={() => handleDigitPress(String(digit))}
            >
              <Text style={styles.pinButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.digitRow,styles.digitRowZero]}>
            <TouchableOpacity style={styles.pinButton}onPress={() => handleDigitPress('0')}>
                <Text style={styles.pinButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[ styles.deleteButton]}onPress={handleDeletePress}>
                <Feather name="delete" size={25} color="white" />
            </TouchableOpacity>
        </View>
    </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor: '#f0f0f0',
        paddingBottom:50,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Lexend',
    },
    pinIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 50,
    },
  pinDot: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    marginHorizontal: 10,
    backgroundColor: '#cbbda6',
  },
  pinContainer: {
    alignItems: 'center',
  },
  digitRow: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,

  },
    digitRowZero:{
        marginHorizontal:40,
        width:'100%',
    },
  pinButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
    marginHorizontal: 30,
  },
  pinButtonText: {
    fontSize: 30,
    fontWeight:'bold',
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width:50,
    borderRadius: 15,
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
  },
  deleteButtonText: {
    fontSize: 18,
    color:'#fff',
  },
});


