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
          <Text style={styles.title}>Concluez vos <Text style={styles.spanTitle}>Deals</Text> sans aucun risque de perte.   </Text>
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
    position:'absolute',
    top:95,
    textAlign:'left',
    paddingRight:20,
    marginRight:30,
    fontWeight:'bold',
    fontSize: 40,
    color: 'white',
    fontFamily: 'LexendBold',
  },
  button: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#D3AF77',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 15,
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
  spanTitle:{
    fontFamily:'redRoseBold',
    color:'#D3AF77'
  }
});
