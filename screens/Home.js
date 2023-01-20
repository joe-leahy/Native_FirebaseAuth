import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native'
import React from 'react'
import Current from './Current'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { LinearGradient } from 'expo-linear-gradient'

const Home = () => {

  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
    <LinearGradient
    colors={['#2D4B73', '#99B4BF']}
    style={styles.background}

  />
    <View styles = {styles.home}>
      <Current />
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  home:{
    display:'flex',
    height:'100%',
    alignContent:'space-between',

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    opacity:.8
  },
  button: {
    position:'absolute',
    bottom:-400,
    backgroundColor: "#253C59",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
    alignSelf:'center',
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
})
