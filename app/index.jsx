import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {

  return (
    <ImageBackground
      source={require('@/assets/images/bg-image-index.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Bienvenue</Text>
        </View>
        <Link href="/login" asChild style={styles.button}>
          <Pressable><Text style={styles.buttonText}>Commencer</Text></Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 60,
    backgroundColor: '#D3AF77',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'SpaceMono',
  },
  textLogin: {
    bottom: 40,
    fontSize: 14,
    color: 'white',
  },
});
