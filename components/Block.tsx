import { Platform, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { ReactNode } from 'react';

interface RoundedShadowedBlockProps {
  children: ReactNode;
}

export function Block({ children }: RoundedShadowedBlockProps) {
  const colorScheme = useColorScheme();

  // Définir la couleur de fond en fonction du thème
  const backgroundColor = colorScheme === 'dark' ? '#151718' : '#f0f1f6';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor },
        styles.shadow,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12, // Rayon de bordure pour les coins arrondis
    padding: 16, // Rembourrage intérieur du bloc
    width: '100%', // Largeur du bloc
    marginTop: 2,
    overflow: 'hidden', // Masquer le contenu qui dépasse
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Couleur de l'ombre
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25, // Opacité de l'ombre
        shadowRadius: 3.84, // Rayon de flou de l'ombre
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
