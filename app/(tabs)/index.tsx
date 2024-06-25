import { Image, StyleSheet, Platform,useColorScheme, Text, Button, Alert, View } from 'react-native';
import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Block } from '@/components/Block';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  // const backgroundColor = colorScheme === 'dark' ? '#D3AF77' : '#F8F3E9';

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}><ThemedText type="title">Bienvenue!</ThemedText><HelloWave /></View>
        
      </View>
      <Block>
        <Text style={[styles.titleTransaction, { color: textColor }]}>Transaction</Text>
        <Text style={[styles.ZeroTransac,{ color: textColor }]}>Vous n'avez aucune transaction</Text>
      </Block>
    </>
    
  );
}

const styles = StyleSheet.create({
  header:{
    paddingHorizontal:15,
    paddingVertical:60,
    height:'30%',
    backgroundColor:'#D3AF77',
    borderRadius:22,
    shadowColor: '#000', // Couleur de l'ombre (noir)
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.20, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de flou de l'ombre
    elevation: 2, // Hauteur de l'élévation pour Android
  },
  titleContainer: {
    backgroundColor:'#e5e3e300',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  titleTransaction: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  ZeroTransac:{
    margin:'auto',
    fontSize:19,
    marginTop:120,
    marginBottom:120,
  }
});
