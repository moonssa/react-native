import { StatusBar } from "expo-status-bar";
import reactDom from "react-dom";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

// const {height, width} = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get("window");
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Bundang</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        // indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>17</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>17</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>17</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>17</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
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
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
