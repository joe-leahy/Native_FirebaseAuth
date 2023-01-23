import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import { WEATHER_API_KEY, WEATHER_API_URL, GEO_API_URL } from "../api";
import * as Location from "expo-location";

const Current = ({ data }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <View>
            <View style = {styles.nowIn}>
              <Text style={styles.now}>Now </Text>
              <Text style={styles.in}>in: </Text>
            </View>
            <Text style={styles.city}>{data.name}</Text>
            <Text style={styles.sky}>{data.weather[0].description}</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
            }}
          />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.temp}>{Math.round(data.main.temp)} °F</Text>
          <View style={styles.details}>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Feels Like: </Text>
              <Text style={styles.paramValue}>
                {Math.round(data.main.feels_like)} °F
              </Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Pressure: </Text>
              <Text style={styles.paramValue}>{data.main.pressure}</Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Humidity: </Text>
              <Text style={styles.paramValue}>{data.main.humidity}%</Text>
            </View>
            <View style={styles.paramRow}>
              <Text style={styles.paramLabel}>Wind: </Text>
              <Text style={styles.paramValue}>
                {Math.round(data.wind.speed)} mph
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Current;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0011",
    height: 250,
    width: 350,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 25,
    shadowColor: "black",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    paddingTop: 0,
    padding: 20,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  nowIn:{
    flexDirection:"row",
    marginBottom:6
  },
  now:{
    color:'white',
    fontSize:14,
    fontWeight:'800'
  },
  in:{
    color:'white'
  },
  city: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 24,
    marginBottom:5
  },
  sky: {
    fontWeight: "400",
    color: "white",
    textAlign: "right",
  },
  temp: {
    fontWeight: "800",
    fontSize: 70,
    width: "auto",
    letterSpacing: -9,
    color: "white",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: 100,
    color: "white",
    marginRight: 20,
  },
  paramRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paramLabel: {
    textAlign: "left",
    fontWeight: "400",
    color: "white",
  },
  paramValue: {
    textAlign: "right",
    fontWeight: "600",
    color: "white",
  },
  icon: {
    height: 120,
    width: 100,
  },
});
