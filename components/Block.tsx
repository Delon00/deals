import { Platform, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { ReactNode } from 'react';

interface RoundedShadowedBlockProps {
  children: ReactNode;
}

export function Block({ children }: RoundedShadowedBlockProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1c1c1c' : '#fff';

  return (
    <View style={[styles.container,{ backgroundColor },styles.shadow,]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12, // Rayon de bordure pour les coins arrondis
    padding: 16, // Rembourrage intérieur du bloc
    width: '90%', // Largeur du bloc
    height:'65%',
    marginVertical: 20,
    overflow: 'hidden',
    marginHorizontal:'auto'
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
