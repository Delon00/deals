import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('@/assets/images/bg-image-index.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Commencer pressé')}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
        <Text>Se connecter</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode:'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'SpaceMono',
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#D3AF77',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#fff',
    fontFamily: 'SpaceMono',
  },
});
