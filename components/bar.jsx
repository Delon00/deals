import { useState } from 'react';
import { StyleSheet, View,useColorScheme } from 'react-native';



export function Bar(){
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? '#1c1c1c' : '#e7e6e8';

    return(
        <View style={[styles.hr,{backgroundColor}]}></View>
    );
}

const styles = StyleSheet.create({
    hr: {
        width: 270,
        height: 1,
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:10,
    },
});