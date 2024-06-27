import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressDots({ step }) {
  const steps = ['index', 'otp', 'password'];

  return (
    <View style={styles.container}>
      {steps.map((s, index) => (
        <View
          key={s}
          style={[
            styles.dot,
            step === s && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 30,
    height: 30,
    borderRadius: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#D3AF77',
  },
});
