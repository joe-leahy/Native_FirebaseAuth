import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 const navigation = useNavigation();

  useEffect(() =>{
   const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace('Home')
      }
    })
    return unsubscribe
  },[])

  const handleSignUp = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(`Registered with: ${user.email}`)
      navigation.replace('Home')
  })
    .catch(error => alert(error.message))
}

  const handleLogin = () => {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log(`Logged in with: ${user.email}`)
      navigation.replace('Home')
  })
    .catch(error => alert(error.message))
}


  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
     <LinearGradient
        // Background Linear Gradient
        colors={['#2D4B73', '#99B4BF']}
        style={styles.background}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value = { email }
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          value = { password }
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
          >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
          >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

  )
}

export default Login

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
  inputContainer:{
      width:'80%',
    },
  input:{
    backgroundColor:'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop:5,
    },
  buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
    },
  button:{
    backgroundColor:'#253C59',
    width:'100%',
    padding: 15,
    borderRadius:10,
    alignItems:'center',
    },
  buttonOutline:{
    backgroundColor:'white',
    marginTop: 5,
    borderColor:'#253C59',
    borderWidth:2,
    },
  buttonOutlineText:{
    color:'#03738C',
    fontWeight:'700',
    fontSize: 16,

    },
  buttonText:{
    color:'white',
    fontWeight:'700',
    fontSize: 16,
    }



})
