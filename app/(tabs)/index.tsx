import { Image, StyleSheet, Platform, useColorScheme, Text, Button, Alert, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { Block } from '@/components/Block';
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Bienvenue! <HelloWave /></ThemedText>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <FontAwesome name="gear" size={25} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Block>
        <Text style={[styles.titleTransaction, { color: textColor }]}>Transaction</Text>
        <Text style={[styles.ZeroTransac, { color: textColor }]}>Vous n'avez aucune transaction</Text>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 60,
    height: '30%',
    backgroundColor: '#D3AF77',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  titleContainer: {
    backgroundColor: '#e5e3e300',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
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
  ZeroTransac: {
    margin: 'auto',
    fontSize: 19,
    marginTop: 120,
    marginBottom: 120,
  },
});
