import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet,useColorScheme, ImageBackground, Platform,View, Text,TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import {router} from 'expo-router';



export default function TabTwoScreen() {

  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const navigateToSettings = () => {
    router.push('settings');
  };
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Bienvenue! <HelloWave /></ThemedText>
          <TouchableOpacity onPress={navigateToSettings}>
            <FontAwesome name="gear" size={25} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.amount , { color: textColor }]}>35.000f</Text>
        </View>
      </View>

      <View style={[styles.cardTransaction,styles.cardVendre]}>
        <ImageBackground source={require('@/assets/images/bg-sell.jpg')} resizeMode="cover" style={styles.bgImg}>
          <Text></Text>
        </ImageBackground>
      </View>

      <View style={[styles.cardTransaction,styles.cardVendre]}>
        <ImageBackground source={require('@/assets/images/bg-buy.jpg')} resizeMode="cover" style={styles.bgImg}>
          <Text></Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, justifyContent:'flex-start', gap:30,},
  cardTransaction: {
    ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
      },
      android: {elevation: 5,},}),
    borderRadius:20,
    flexDirection: 'column',
    width:'100%',
    overflow:'hidden',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#fff',
    backgroundColor:'red',
  },
  cardVendre:{

  },
  bgImg:{
    padding:100,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 60,
    height: '30%',
    backgroundColor: '#D3AF77',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 20,
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
    justifyContent: 'space-between',
    gap: 8,
  },
  recentText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  amount:{
    fontFamily:'Lexend',
    fontSize:50,
    fontWeight:'bold',
    textAlign:'center',
  },
});
