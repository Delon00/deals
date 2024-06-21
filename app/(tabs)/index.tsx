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

  return (
    <>
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue!</ThemedText>
        <HelloWave />
      </ThemedView>
      <Block>
      <Text style={[styles.titleTransaction, { color: textColor }]}>Transaction</Text>
        <Text style={[styles.ZeroTransac,{ color: textColor }]}>Vous n'avez aucune transaction</Text>
      </Block>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => Alert.alert('Simple Button pressed')}
          title="Nouvelle transaction"
          color="#fff"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </ParallaxScrollView>

    </>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 4,
    marginBottom: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  titleTransaction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    borderRadius: 15,
    marginTop: 20,
    paddingHorizontal: 16,
    backgroundColor:'#F0C755',
  },
  ZeroTransac:{
    marginLeft:'auto',
    marginRight:'auto',
    fontSize:18,
    marginTop:120,
    marginBottom:120,
  }
});
