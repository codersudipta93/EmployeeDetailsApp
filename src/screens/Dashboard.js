import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Component
import Header from "../components/Header";
import Button from "../components/Button";

//services
import { fetchWeather } from "../services/weatherService";
import { getData } from '../storage/asyncStorageHelper';


const Dashboard = () => {
  const navigation = useNavigation();

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrMsg] = useState("");

  useEffect(() => { loadWeather(); }, []);

  const loadWeather = async () => {
    try {
      const storedData = await getData('userDetails');
      if (!storedData) {
        setLoading(false);
        return;
      }

      const userDetails = JSON.parse(storedData);

      if (userDetails.city) {
        setCity(userDetails.city);
        const apiResponse = await fetchWeather(userDetails.city);
        if (apiResponse.data != "") {
          setWeather(apiResponse?.data);
          setLoading(false);
        } else {
          setErrMsg(apiResponse.message);
          setLoading(false);
        }
      } else {
        setErrMsg("City Details Not Found");
      }
    } catch (error) {
      console.log("Error loading weather:", error);
      setLoading(false);
    }
  };

  const WeatherDetailItem = ({ icon, label, value, iconColor }) => (
    <View style={styles.weatherDetailItem}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
        {icon}
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );


  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#2575fc"/>
      <SafeAreaView style={styles.container}>
        <Header title="Dashboard" />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* City and Weather Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.cityText}>{city}</Text>
            <Text style={styles.dateText}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          {/* Weather Content */}
          {loading ? (
            <View style={{ marginBottom: 150 }}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          ) : weather ? (
            <View style={styles.weatherContainer}>
              {/* Weather Icon */}
              <Image
                source={{
                  uri: weather.weather && weather.weather[0]?.icon
                    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
                    : "https://via.placeholder.com/100"
                }}
                style={styles.weatherIcon}
              />

              {/* Temperature */}
              <Text style={styles.temperatureText}>
                {Math.round(weather.main?.temp)}°
              </Text>
              <Text style={styles.weatherDescription}>
                {weather.weather[0]?.description}
              </Text>

              {/* Weather Details Grid */}
              <View style={styles.weatherDetailsGrid}>
                <WeatherDetailItem
                  icon={<Ionicons name="thermometer-outline" size={20} color="white" />}
                  label="Feels Like"
                  value={`${Math.round(weather.main?.feels_like)}°C`}
                  iconColor="#FF6B6B"
                />
                <WeatherDetailItem
                  icon={<MaterialCommunityIcons name="weather-windy" size={20} color="white" />}
                  label="Wind"
                  value={`${weather.wind?.speed} m/s`}
                  iconColor="#4ECDC4"
                />
                <WeatherDetailItem
                  icon={<Ionicons name="water-outline" size={20} color="white" />}
                  label="Humidity"
                  value={`${weather.main?.humidity}%`}
                  iconColor="#45B7D1"
                />
                <WeatherDetailItem
                  icon={<Ionicons name="sunny-outline" size={20} color="white" />}
                  label="Sunrise"
                  value={new Date(weather.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  iconColor="#FFD93D"
                />
              </View>
            </View>
          ) : (
            <View style={styles.weatherContainer}>
              <Text style={styles.errorText}>{errorMsg}</Text>
              <TouchableOpacity style={styles.reloadBtn} onPress={() => {
                setLoading(true);
                loadWeather();
              }}>
                <Ionicons name="refresh-outline" size={24} color="#000" />
                <Text>Reload</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.navigationContainer, { marginTop: weather ? 0 : 25 }]}>
            <Button
              onPress={() => navigation.navigate("AddDetails")}
              icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
              title="Add Details"
              colors={['#250259', '#250259']}
              disabled={false}
            />

            <Button
              onPress={() => navigation.navigate("SeeDetails")}
              icon={<Ionicons name="list-circle-outline" size={24} color="white" />}
              title="See Details"
              colors={['#ab7e03', '#ab7e03']}
              disabled={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cityText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  weatherContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: '700',
    color: 'white',

  },
  weatherDescription: {
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
    marginBottom: 25,
  },
  weatherDetailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  weatherDetailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: 3,
  },
  detailValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#e3c7ff',
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 20,
    //marginBottom: 40
  },
  reloadBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '35%', backgroundColor: '#faf2b4', borderRadius: 8, paddingVertical: 4 }
});

export default Dashboard;