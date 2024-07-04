import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform,View, Text } from 'react-native';



export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.cardTransaction,styles.cardVendre]}>
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  cardTransaction: {
    flexDirection: 'column',

    gap: 8,
  },
  cardVendre:{
    
  }
});
