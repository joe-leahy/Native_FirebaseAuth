import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, SafeAreaView} from 'react-native'
import React, {useState, useEffect} from 'react'
import Current from './Current'
import Forecast from './Forecast'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { LinearGradient } from 'expo-linear-gradient'
import { WEATHER_API_KEY, WEATHER_API_URL } from '../api'
import * as Location from 'expo-location'

const Home = () => {

  const navigation = useNavigation();

  const [weather, setWeather] = useState(null)
  const [refreshing, setRefreshing] = useState(false);
  const [forecast, setForecast] = useState(null)
  const [forecastRefreshing, setForecastRefreshing] = useState(false);


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

  const loadForecast =  async () =>{
    setRefreshing(true);
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      Alert.alert('No Permission')
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})

    const currentFetch = await fetch(`${WEATHER_API_URL}/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}&units=imperial`)
    const data = await currentFetch.json()

    if(!currentFetch.ok){
      Alert.alert("Something went wrong")
    } else{
      setForecast(data)
    }
    setForecastRefreshing(false)
  }

  useEffect(()=>{
    loadWeather()
    loadForecast()
  },[])

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
    <SafeAreaView styles = {styles.home}>
      {weather && <Current data = {weather}  />}
      {forecast && <Forecast data = {forecast}  />}
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    position:'fixed',
    bottom:40,
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
