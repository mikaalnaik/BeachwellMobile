import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, Easing } from 'react-native';
import posed from 'react-native-pose';
import Images from '../assets/beachImages';
const Firebase = require("firebase");
require("firebase/functions");


const BEACH_NAMES = {
  1: "Marie Curtis Park East Beach",
  2: "Sunnyside Beach",
  3: "Hanlan's Point Beach",
  4: "Gibraltar Point Beach",
  5: "Centre Island Beach",
  6: "Ward's Island Beach",
  7: "Woodbine Beaches",
  8:"Kew Balmy Beach",
  9:"Bluffer's Beach Park",
  10:"Rouge Beach",
  11:"Cherry Beach",
}

const BEACH_AREAS = {
  1: "eastToronto",
  2: "eastToronto",
  3: "torontoIsland",
  4: "torontoIsland",
  5: "torontoIsland",
  6: "torontoIsland",
  7: "westToronto",
  8: "westToronto",
  9: "westToronto",
  10: "westToronto",
  11: "westToronto",
}


export default class Splash extends React.Component {
  static navigationOptions = {
     header: null
 }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.animatedValue = new Animated.Value(0);
  }

  animate = () => {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start()
  }

  componentDidMount () {
    let collectAllDataFromServer = Firebase.functions().httpsCallable('beachAndWeatherData');
    collectAllDataFromServer().then((result) => {
      let formatedBeachData = result.data.beachToday.elements[0].elements[1].elements.map((beach, index) => {
        if(index > 0) {
          let beachData = {
             beachId: beach.attributes.beachId,
             beachName: BEACH_NAMES[beach.attributes.beachId],
             condition: beach.elements[4].elements[0].text,
             date: beach.elements[0].elements[0].text,
             eColi: beach.elements[2].elements[0].text,
          }
          return beachData
        }
      })
      formatedBeachData.shift()
      let beachData = {
        eastToronto: [],
        torontoIsland: [],
        westToronto: [],
      }
      formatedBeachData.forEach(beach => {
        beachData[BEACH_AREAS[beach.beachId]].push(beach)
      })
      this.setState({
        weatherData: result.data.weatherData,
        beachToday: beachData,
        beach14: result.data.beach14,
        loading: false,
      })
      if(!this.state.loading) {
        this.props.navigation.navigate('BeachList' , {
          weatherData: this.state.weatherData,
          beachToday: this.state.beachToday,
          beach14: result.data.beach14,
        })
      }
    })

    this.animate()
  }

  render() {
    const Box = posed.View({
      visible: {
        opacity: 1,
        scaleY: 1,
        transition: {
          opacity: { ease: 'easeOut', duration: 300 },
          default: { ease: 'linear', duration: 500 }
        }
      }
    });

    let fullWidth = Dimensions.get('window').width;
        const marginLeft = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300]
      })
      const opacity = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      })
      const movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 300, 0]
      })
      const textSize = this.animatedValue.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [18, 32, 98]
      })
      const rotateX = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '180deg', '0deg']
      })

    return (


        <View style={{
          flex: 1,
          backgroundColor: '#2342A2',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth,
        }}>
        <Box style={styles.box} pose={this.isVisible ? 'visible' : 'hidden'} />

        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
          }}
        />
        <Image
          style={styles.images}
          source={Images.logoMark}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
  },
  images: {
    height: 180,
    width: 180,
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
  }
});
