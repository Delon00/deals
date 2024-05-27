import { Platform, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import React, { ReactNode } from 'react';

interface RoundedShadowedBlockProps {
  children: ReactNode;
}

export function Block({ children }: RoundedShadowedBlockProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].tint }, Platform.OS === 'ios' && styles.shadow]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10, // Rayon de bordure pour les coins arrondis
    padding: 16, // Rembourrage intérieur du bloc
    width: '100%', // Largeur du bloc
    marginTop: 20, // Marge supérieure du bloc
    overflow: 'hidden', // Masquer le contenu qui dépasse
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3, // Opacité de l'ombre
        shadowRadius: 4, // Rayon de flou de l'ombre
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
