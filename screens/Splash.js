import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image, Easing, ImageBackground } from 'react-native';
import posed from 'react-native-pose';
import Images from '../assets/beachImages';
import moment from 'moment';
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
  7: "Cherry Beach",
  8: "Woodbine Beaches",
  9: "Kew Balmy Beach",
  10: "Bluffer's Beach Park",
  11: "Rouge Beach",
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
      currentMonth: moment().format('MM'),
    };
  }


  async componentDidMount () {
    await Font.loadAsync({
      'Nunito-SemiBold': require('../assets/fonts/Nunito/Nunito-SemiBold.ttf'),
      'Nunito-SemiBoldItalic': require('../assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf'),
      'Nunito-Bold': require('../assets/fonts/Nunito/Nunito-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });

    if(this.state.currentMonth > 9 || this.state.currentMonth <= 5) {
      let collectAllDataFromServer = Firebase.functions().httpsCallable('beachAndWeatherData');
      collectAllDataFromServer().then((result) => {
        let formatedBeachData;
          if(result.data.predictedValues.eColi === 0) {
             formatedBeachData = Object.keys(BEACH_AREAS).map(beach => {
              let beachData = {
                beachId: beach,
                beachName: BEACH_NAMES[beach],
                date: moment().format('YYYY-MM-DD'),
                eColi: 'N/A',
              }
              return beachData
            })
          } else {
            formatedBeachData = result.data.predictedValues.map((beach, index) => {
              if(index > 0) {
                let beachData = {
                  beachId: beach.beachId,
                  beachName: BEACH_NAMES[beach.beachName],
                  date: beach.date,
                  eColi: beach.eColi,
                }
                return beachData
              }
            })
          }
        formatedBeachData.shift()
        let beachData = {
          eastToronto: [],
          torontoIsland: [],
          westToronto: [],
        }
        formatedBeachData.forEach(beach => {
          // console.log('formated each daa', beach);
          beachData[BEACH_AREAS[beach.beachId]].push(beach)
        })
        this.setState({
          weatherData: result.data.weatherData,
          beachToday: beachData,
          beach14: result.data.beach14,
          loading: false,
        })

        if(!this.state.loading) {
          console.log('just before nav', this.state.weatherData);
          this.props.navigation.navigate('BeachList' , {
            weatherData: this.state.weatherData,
            beachToday: this.state.beachToday,
            beach14: result.data.beach14,
          })
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.setState({
        loading: false,
        offSeason: true,
      })
      this.props.navigation.navigate('OffSeason', {
        offSeason: this.state.offSeason,
        weattherData: null,
        beachToday: null,
        beach14: null,
      })
    }

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
