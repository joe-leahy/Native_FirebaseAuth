import { Alert, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'
import { WEATHER_API_KEY, WEATHER_API_URL, GEO_API_URL } from "../api";
import * as Location from 'expo-location'


const Home = () => {

  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null)
  const [refreshing, setRefreshing] = useState(false);


  const loadWeather =  async () =>{
    setRefreshing(true);
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      Alert.alert('No Permission')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})

    const response = await fetch(`${WEATHER_API_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}&units=imperial`)
    const data = await response.json()

    if(!response.ok){
      Alert.alert("Something went wrong")
    } else{
      setWeather(data)
    }
    setRefreshing(false)
  }

  useEffect(()=>{
    loadWeather()
  },[])

  if(!weather){
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>
  }

  return (
    <View style={styles.container}>

      <LinearGradient
        // Background Linear Gradient
        colors={['#F29849', '#82C9D9']}
        style={styles.background}
      />
      {weather ?
      <>
      <Text>{weather.name}</Text>
      <Image
        style = {styles.icon}
        source= {{uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}}
      />

    <Text>Sky: {weather.weather[0].description}</Text>
    <Text>Temp: {Math.round(weather.main.temp)} °F</Text>
    <Text>Feels Like: {Math.round(weather.main.feels_like)} °F</Text>
    <Text>Pressure: {weather.main.pressure}</Text>
    <Text>Humidity: {weather.main.humidity}%</Text>
    <Text>Wind: {Math.round(weather.wind.speed)} mph</Text>
    </>
      :
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>}




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
    },
  icon:{
    height:300,
    width:250
  }
})
