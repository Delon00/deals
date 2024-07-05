import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet,useColorScheme, ImageBackground, Platform,View, Text,TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import {router} from 'expo-router';
import { BlurView } from 'expo-blur';



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
        <BlurView intensity={60} style={styles.glassContainer}>
          <Text style={[styles.text]}>Montant verrouillé</Text>
          <FontAwesome5 name="lock" size={24} color="gold" />
        </BlurView>
        <View>
          <Text style={[styles.amount , { color: '#fff' }]}>35.000f</Text>
        </View>
      </View>

      <View style={[styles.cardTransaction,styles.cardVendre]}>

          <Text></Text>
      </View>

      <View style={[styles.cardTransaction,styles.cardbuy]}>
          <Text></Text>
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
    width:'95%',
    overflow:'hidden',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#a4a4a44e',
    backgroundColor:'red',
    marginLeft:'auto',
    marginRight:'auto',
  },
  cardVendre:{
    backgroundColor:'#143952',
    height:210,
  },
  cardbuy:{
    backgroundColor:'#9FBBCC',
    height:210,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 60,
    height: '35%',
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
  glassContainer:{
    width:'60%',
    backgroundColor:'',
    marginTop:10,
    borderRadius:30,
    padding:5,
    overflow:'hidden',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:20,
  },
  transaccontainer:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    justifyContent:'center',
    gap:50,
  },
  text:{
    color: '#fff',
    fontSize:17,
    textAlign:'center',
  },
  btntext:{
    color: '#000',
    fontSize:18,
  },
  btnsell:{
    flexDirection:'row',
    padding:5,
    width:130,
    backgroundColor:'#fff',
    borderRadius:30,
    justifyContent:'center',

  },
  btnbuy:{
    flexDirection:'row',
    padding:5,
    width:130,
    backgroundColor:'#fff',
    borderRadius:30,
    justifyContent:'center',
  }
});
