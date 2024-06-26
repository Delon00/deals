import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Deals</Text>
        </View>
      );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#D3AF77',
    fontSize: 70,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
  },
  dot: {
    color: '#D3AF77',
    fontSize: 70,
    marginHorizontal: 2,
  },
});

