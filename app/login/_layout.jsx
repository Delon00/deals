import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useSegments } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function LoginLayout() {
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const segments = useSegments();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentSegment = segments[segments.length - 1];
        const progressMap = {
            index: 1,
            otp: 2,
            password: 3,
        };
        setProgress(progressMap[currentSegment] || 0);
    }, [segments]);

    return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={[styles.container, { backgroundColor }]}>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${(progress / 3) * 100}%` }]} />
            </View>
            <Slot />
        </View>
    </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 110,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        overflow: 'hidden',
        marginHorizontal: 50,
    },
  progressBar: {
    height: '100%',
    backgroundColor: '#D3AF77',
  },
});
