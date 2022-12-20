import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'


const Home = () => {

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F29849', '#82C9D9']}
        style={styles.background}
      />
      <Text style={styles.text}>Welcome: {auth.currentUser.email}</Text>
      <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:'1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    opacity:.75
  },
  button:{
    backgroundColor:'#03738C',
    width:'60%',
    padding: 15,
    borderRadius:10,
    alignItems:'center',
    marginTop:40
    },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize: 16,
    },
  text:{
    fontWeight:'700',
    fontSize: 16,
    flexDirection:'column'
    }
})
