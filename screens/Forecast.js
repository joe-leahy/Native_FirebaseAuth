import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {data.list.splice(0, 7).map((item, idx) => (
          <View key={idx} style={styles.dailyItem}>
            <Text style={styles.day}>{forecastDays[idx]}:</Text>
            <Text>{item.weather[0].description}</Text>
            <Image
              style={styles.icon}
              source={{
                uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`,
              }}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)} °F</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0011",
    display: "flex",
    flexDirection: "column",
    margin: 20,
    height: 400,
    borderRadius: 20,
  },
  dailyItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    height: 50,
    width: 300,
    margin: 5,
    borderRadius: 10,
    borderBottomColor:'black',
    borderBottomWidth:1
  },
  icon:{
    height:40,
    width:40
  }
});
