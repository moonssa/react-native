import { StatusBar } from "expo-status-bar";
import reactDom from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";

// const {height, width} = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "fed5f48ab273601bbc5efb9b5696d0b7";

export default function App() {
  const [days, setDays] = useState([]);
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        // indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tiny_description}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    // backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 62,
    fontWeight: "500",
  },
  weather: {
    // flex: 3,
    // backgroundColor: "orange",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    // backgroundColor: "orange",
  },
  temp: {
    marginTop: 50,
    fontSize: 150,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
  tiny_description: {
    fontSize: 20,
  },
});
