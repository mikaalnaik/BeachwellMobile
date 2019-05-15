import React from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import Images from '../assets/beachImages';
import WeatherImages from '../assets/weatherImages.js';






let WeatherIcon = (props) => {

  const weatherTypes = {
    'clear sky': 'sunshine',
    'few clouds': 'sunshine',
    'scattered clouds': 'partlycloudy',
    'overcast clouds': 'partlycloudy',
    'broken clouds': 'partlycloudy',
    'thunder storm': 'storm',
    'snow': 'storm',
    'light intensity shower rain': 'rain',
    'light intensity drizzle': 'rain',
    'light rain': 'rain',
    'shower rain': 'rain',
    'rain': 'rain',
    'mist': 'rain',
  }

  const weatherID = {
    200: 'storm',
    201: 'storm',
    202: 'storm',
    210: 'storm',
    211: 'storm',
    212: 'storm',
    221: 'storm',
    230: 'storm',
    231: 'storm',
    232: 'storm',
    300: 'rain',
    301: 'rain',
    302: 'rain',
    310: 'rain',
    311: 'rain',
    312: 'rain',
    313: 'rain',
    314: 'rain',
    321: 'rain',
    500: 'rain',
    501: 'rain',
    502: 'storm',
    503: 'storm',
    504: 'storm',
    511: 'rain',
    520: 'rain',
    521: 'rain',
    522: 'rain',
    531: 'rain',
    600: 'rain',
    601: 'rain',
    602: 'rain',
    611: 'rain',
    612: 'rain',
    613: 'rain',
    615: 'rain',
    616: 'rain',
    620: 'rain',
    621: 'rain',
    622: 'rain',
    701: 'partlycloudy',
    711: 'partlycloudy',
    721: 'partlycloudy',
    731: 'partlycloudy',
    741: 'partlycloudy',
    751: 'partlycloudy',
    761: 'partlycloudy',
    762: 'partlycloudy',
    771: 'partlycloudy',
    781: 'partlycloudy',
    800: 'sunshine',
    801: 'sunshine',
    802: 'sunshine',
    803: 'partlycloudy',
    804: 'partlycloudy',
  }
  console.log('weather props', props.weatherID.id);



  return (
    <View style={styles.weatherImageContainer}>
      <Image
        source={WeatherImages[weatherTypes[props.weatherID.id]]}
        style={[styles.weatherImage]}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  weatherImageContainer: {
    height: 34,
    width: 34,
  },
  weatherImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});


export default WeatherIcon
