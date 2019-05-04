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
  console.log('weather tpe', props.weatherType);

  const weatherTypes = {
    'clear sky': 'sunshine',
    'few clouds': 'sunshine',
    'scattered clouds': 'partlycloudy',
    'overcast clouds': 'partlycloudy',
    'broken clouds': 'partlycloudy',
    'shower rain': 'rain',
    'light intensity shower rain': 'rain',
    'light intensity drizzle': 'rain',
    'light rain': 'rain',
    'rain': 'rain',
    'thunder storm': 'storm',
    'snow': 'storm',
    'mist': 'rain'
  }
  console.log('weather icon props', props);
  return (
    <View style={styles.weatherImageContainer}>
      <Image
        source={WeatherImages[weatherTypes[props.weatherType]]}
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
