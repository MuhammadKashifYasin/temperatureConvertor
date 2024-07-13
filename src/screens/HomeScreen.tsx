// App.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  PermissionsAndroid,
  Platform,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeModules} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import HomeImage from '../assets/images/BackgroundImage.png';
import Content from '../common/Content';
import Container from '../common/Container';
import {wp} from '../common/Reponsive';
import ResponsiveText from '../common/ResponsiveText';
import axios from 'axios';
const {BatteryModule, TemperatureModule} = NativeModules;

const HomeScreen = () => {
  const [temperature, setTemperature] = useState<any>();
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [tabs, setTabs] = useState('celsius');
  const [convertedTemp, setConvertedTemp] = useState(`${temperature} °C`);
  const [disabledButtons, setDisabledButtons] = useState({
    button1: true,
    button2: false,
    button3: false,
  });
  console.log(location);
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocation();
    }
  }, []);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude, 'pppppp');
        fetchWeatherByCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
        setLocation(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const getBatteryTemperature = async () => {
    try {
      const temperature = await BatteryModule.getBatteryTemperature();
      const temp = parseFloat(temperature);
      if (!isNaN(temp)) {
        setConvertedTemp(`${(temp - 6.5).toFixed(1)} °C`);
        setTemperature(`${(temp - 6.5).toFixed(1)} °C`);
      }
      // setConvertedTemp(temperature);
      // setTemperature(temperature);
      console.log(`Battery Temperature: ${temperature.toFixed(2)}°C`);
    } catch (e) {
      console.error(e);
    }
  };
  const getTemperature = async () => {
    try {
      const temperature = await TemperatureModule.getTemperature();
      console.log(`Temperature: ${temperature}°C`);
    } catch (e) {
      console.error(e);
    }
  };
  const setTemperatureUnit = data => {
    if (data == 'celsius') {
      const temp = parseFloat(temperature);
      if (!isNaN(temp)) {
        setConvertedTemp(`${temp.toFixed(1)} °C`);
      }
    }
    if (data == 'fahrenheit') {
      const temp = parseFloat(temperature);
      if (!isNaN(temp)) {
        const fahrenheit = (temp * 9) / 5 + 32;
        setConvertedTemp(`${fahrenheit.toFixed(1)} °F`);
      }
    }
    if (data == 'kelvin') {
      const temp = parseFloat(temperature);
      if (!isNaN(temp)) {
        const kelvin = temp + 273.15;
        setConvertedTemp(`${kelvin.toFixed(1)} K`);
      }
    }
  };
  const API_KEY = 'afa35909369d5dc74d34262a080b8dfc'; // Replace with your OpenWeather API key

  const fetchWeatherByCoordinates = async (lat, long) => {
    console.log(lat, long);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`,
      );
      console.log(response.data.main, '----');
      setWeather(response.data);
      setError(null);
    } catch (err) {
      console.log(err, '=-=-=---');
      setError('Error fetching weather data');
      setWeather(null);
    }
  };
  // console.log(weather, 'iiii');
  useEffect(() => {
    getTemperature();
    getBatteryTemperature();

    // getBatteryTemperature().then(temp => setTemperature(temp));
  }, []);
  const formatTime = timestamp => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };
  const weatherDetails = [
    // {
    //   label: 'Temperature',
    //   value: `${weather?.temp}°C`,
    //   icon: require('../assets/images/hot.png'),
    // },
    {
      label: 'Feels Like',
      value: `${weather?.main?.feels_like}°C`,
      icon: require('../assets/images/feel_like.png'),
    },
    {
      label: 'Humidity',
      value: `${weather?.main?.humidity}%`,
      icon: require('../assets/images/humidity.png'),
    },
    {
      label: 'Pressure',
      value: `${weather?.main?.pressure} hPa`,
      icon: require('../assets/images/barometer.png'),
    },
    {
      label: 'Wind Speed',
      value: `${weather?.wind?.speed} m/s`,
      icon: require('../assets/images/storm.png'),
    },
    {
      label: 'Sunrise',
      value: formatTime(weather?.sys?.sunrise),
      icon: require('../assets/images/sunrise.png'),
    },
    {
      label: 'Sunset',
      value: formatTime(weather?.sys?.sunset),
      icon: require('../assets/images/sunset.png'),
    },
  ];
  return (
    // <ImageBackground
    //   style={{width: '105%', height: '100%', backgroundColor: 'black', flex: 1}}
    //   resizeMode="stretch"
    //   source={HomeImage}>
    <Container
      // statusBarColor={'transparent'}
      // translucent
      barStyle="dark-content"
      backgroundImage={HomeImage}>
      <View style={{marginTop: wp(10), paddingHorizontal: wp(3)}}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            disabled={disabledButtons.button1}
            onPress={() => {
              setTabs('celsius');
              setDisabledButtons({
                button1: true,
                button2: false,
                button3: false,
              });
              setTemperatureUnit('celsius');

              // setTemperature(((temperature - 32) * 5) / 9);
            }}
            style={{
              ...styles.buttonContainer,
              borderWidth: 1,
              borderColor: tabs == 'celsius' ? 'white' : '#46309A',
            }}>
            <ResponsiveText style={{color: 'white'}}>CELSIUS</ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabledButtons.button2}
            onPress={() => {
              setTabs('fahrenheit');
              setDisabledButtons({
                button1: false,
                button2: true,
                button3: false,
              });
              setTemperatureUnit('fahrenheit');

              // setTemperature((temperature * 9) / 5 + 32);
            }}
            style={{
              ...styles.buttonContainer,
              marginHorizontal: wp(3),
              borderWidth: 1,
              borderColor: tabs == 'fahrenheit' ? 'white' : '#46309A',
            }}>
            <ResponsiveText style={{color: 'white'}}>FAHRENHEIT</ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabledButtons.button3}
            onPress={() => {
              setTabs('kelvin');
              setDisabledButtons({
                button1: false,
                button2: false,
                button3: true,
              });
              setTemperatureUnit('kelvin');

              // setTemperature((temperature * 9) / 5 + 32);
            }}
            style={{
              ...styles.buttonContainer,
              borderWidth: 1,
              borderColor: tabs == 'kelvin' ? 'white' : '#46309A',
            }}>
            <ResponsiveText style={{color: 'white'}}>KELVIN</ResponsiveText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // padding: 20,
            backgroundColor: 'rgba(5, 5, 5, 0.5)',
            borderRadius: 10,
            overflow: 'hidden',
            // height: wp(45),
            // alignItems: 'center',
          }}>
          <View style={{backgroundColor: 'rgba(25, 25, 25, 0.5)'}}>
            <ResponsiveText
              style={{
                color: 'white',
                fontSize: 6,
                fontWeight: 'bold',
                paddingVertical: wp(2),
                textAlign: 'center',
              }}>
              INDOOR
            </ResponsiveText>
          </View>
          <View
            style={{
              // alignItems: 'center',
              // justifyContent: 'center',
              // backgroundColor: 'red',
              // flex: 1,
              flexDirection: 'row',
              paddingHorizontal: wp(5),
              paddingVertical: wp(10),
              justifyContent: 'space-between',
            }}>
            <Image
              style={{width: wp(15), height: wp(15)}}
              source={require('../assets/images/room-temperature.png')}
            />
            <ResponsiveText style={styles.temperature}>
              {convertedTemp}
              {/* {(temperature - 6.5).toFixed(1)} */}
            </ResponsiveText>
            <View style={{width: wp(5), height: wp(5)}} />
          </View>
        </View>
        <View
          style={{
            marginTop: wp(5),
            backgroundColor: 'rgba(5, 5, 5, 0.5)',
            borderRadius: 10,
            overflow: 'hidden',
            // height: wp(45),
            // alignItems: 'center',
          }}>
          <View style={{backgroundColor: 'rgba(25, 25, 25, 0.5)'}}>
            <ResponsiveText
              style={{
                color: 'white',
                fontSize: 6,
                fontWeight: 'bold',
                paddingVertical: wp(2),
                textAlign: 'center',
              }}>
              OUTDOOR
            </ResponsiveText>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: wp(8),
              // backgroundColor: 'red',
              // flex: 1,
            }}>
            <ResponsiveText style={styles.temperature}>
              {/* {weather?.main?.temp} */}
              {weather?.main?.temp.toFixed(1)} °C
            </ResponsiveText>
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: wp(3),
            }}>
            {weather &&
              weatherDetails.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // marginTop: wp(5),
                      backgroundColor: 'rgba(5, 5, 5, 0.5)',
                      borderRadius: 10,
                      overflow: 'hidden',
                      height: wp(30),
                      width: wp(25),
                      marginBottom: wp(5),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{height: wp(10), width: wp(10)}}
                      source={item.icon}
                    />
                    <ResponsiveText
                      style={{
                        color: 'white',
                        fontSize: 3,
                        marginVertical: wp(1),
                      }}>
                      {item.label}
                    </ResponsiveText>
                    <ResponsiveText
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 4.5,
                      }}>
                      {item.value}
                    </ResponsiveText>
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  temperature: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    // marginHorizontal: 5,
    backgroundColor: 'rgba(5, 5, 5, 0.5)', // White color with 70% opacity
    borderRadius: 5,
    height: wp(10),
    marginBottom: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
