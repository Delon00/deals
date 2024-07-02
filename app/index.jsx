import React, { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexScreen = () => {

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          router.push('/(Tabs)');
        } else {
          router.push('/start');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session :', error);
      }
    };

    checkSession();
  }, []);

  return (
    <></>
  );
};

export default IndexScreen;
