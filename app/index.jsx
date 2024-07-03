import React, { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export default function IndexScreen() {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userToken = await AsyncStorage.getItem('usertoken');
        if (userToken) {
          const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
          if (isBiometricAvailable) {
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (savedBiometrics) {
              const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Connexion à Deals',
                fallbackLabel: 'Entrez votre mot de passe',
                disableDeviceFallback: true,
              });
              if (result.success) {
                router.push('/(tabs)');
              } else {
                router.push('pin');
              }
            } else {
              console.warn('No biometrics saved');
              // Optionally handle the case where no biometrics are saved
            }
          } else {
            console.warn('Biometric hardware not available');
            // Optionally handle the case where biometric hardware is not available
          }
        } else {
          router.push('/start');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
      }
    };
    checkSession();
  }, []);

  return (
    <></>
  );
}
