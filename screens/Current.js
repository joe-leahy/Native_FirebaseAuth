import { Alert, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator, Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'
import { WEATHER_API_KEY, WEATHER_API_URL, GEO_API_URL } from "../api";
import * as Location from 'expo-location'


const Current = () => {

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

  return (
    <>
    <View style={styles.container}>
      {weather ?
      <>
      <View style={styles.top}>
        <View>
      <Text style ={styles.city}>{weather.name}</Text>
       <Text style = {styles.sky}>{weather.weather[0].description}</Text>
        </View>
      <Image
        style = {styles.icon}
        source= {{uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}}
      />

        </View>
      <View style = {styles.bottom}>
      <Text style = {styles.temp}>{Math.round(weather.main.temp)} °F</Text>
        <View style ={styles.details}>
          <View style={styles.paramRow}>
            <Text style = {styles.paramLabel}>Feels Like: </Text>
            <Text style = {styles.paramValue}>{Math.round(weather.main.feels_like)} °F</Text>
          </View>
          <View style={styles.paramRow}>
            <Text style = {styles.paramLabel}>Pressure: </Text>
            <Text style = {styles.paramValue}>{weather.main.pressure}</Text>
          </View>
          <View style={styles.paramRow}>
            <Text style = {styles.paramLabel}>Humidity: </Text>
            <Text style = {styles.paramValue}>{weather.main.humidity}%</Text>
          </View>
          <View style={styles.paramRow}>
            <Text style = {styles.paramLabel}>Wind: </Text>
            <Text style = {styles.paramValue}>{Math.round(weather.wind.speed)} mph</Text>
          </View>
         </View>
      </View>
      </>
      :
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size='large'/>
    </SafeAreaView>}
    </View>

    </>

  )
}

export default Current;

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#0011',
    height:250,
    width:350,
    alignSelf:'center',
    marginTop:100,
    borderRadius:25,
    shadowColor:'black',
    shadowRadius:8,
    shadowOpacity:.3,
    paddingTop:0,
    padding:20,
  },
  top:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  bottom:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
  },
  city:{
    color:'white',
    textAlign:'center',
    fontWeight:"800",
    fontSize:24,
  },
  sky:{
    fontWeight:"400",
    color:'white',
    textAlign:'right'
  },
  temp:{
    fontWeight:'800',
    fontSize:70,
    width:'auto',
    letterSpacing:-9,
    color:'white',
  },
  details:{
    display:'flex',
    flexDirection:'column',
    width: 100,
    color:'white',
    marginRight:20
  },
  paramRow:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  paramLabel:{
    textAlign:'left',
    fontWeight:'400',
    color:'white',
  },
  paramValue:{
    textAlign:'right',
    fontWeight:'600',
    color:'white'
  },
  icon:{
    height:120,
    width:100
    }
})
