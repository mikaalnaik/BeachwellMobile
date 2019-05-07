import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, Easing, ImageBackground } from 'react-native';
import posed from 'react-native-pose';
import Images from '../assets/beachImages';
import { Font } from 'expo';
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
      fontLoaded: false,
    };
  }


  async componentDidMount () {
    await Font.loadAsync({
      'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
      'Nunito-SemiBoldItalic': require('../assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf'),
      'Nunito-Bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
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
    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    return (
      <View style={ styles.container }>


        <ImageBackground source={require('../assets/beachSplash.jpg')} style={styles.backgroundImage} >

        {
          this.state.fontLoaded &&
          <View style={ styles.loginForm }>
             <Image
               style={styles.logoMark}
               source={require('../assets/beachLogoMark.png')}
             />

           </View>
         }

         </ImageBackground>

       </View>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  loginForm: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: -20,
  },
  logoMark: {
    height: 160,
    resizeMode: 'contain',
    marginBottom: 20,
  },

});
