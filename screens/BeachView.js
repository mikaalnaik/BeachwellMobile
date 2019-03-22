import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Images from '../assets/beachImages.js';
import WeatherImages from '../assets/weatherImages.js';
import Image from 'react-native-scalable-image';
import BeachImageSelector from '../components/BeachImageSelector';
import {BarChart, Grid, YAxis, XAxis} from 'react-native-svg-charts'
import * as scale from 'd3-scale'

let WeatherCard = (props) => {
  const temp = Math.floor(props.weatherData.data.main.temp - 273.15);
  const sunset = new Date(props.weatherData.data.sys.sunset).toLocaleTimeString("en-US")
  console.log({temp});
  console.log({sunset});
  return (<View style={[styles.beachViewCard, styles.cardShadow, styles.row]}>
    <WeatherIcon weatherType={props.weatherData.data.weather[0].description}/>
    <Text style={[styles.boldStat, styles.marginRight10]}>
      {temp}°C
    </Text>
    <Text style={styles.sunset}>
      Sunset at {sunset}
    </Text>
  </View>)
}

let WeatherIcon = (props) => {

  const weatherTypes = {
    'clear sky': 'sunshine',
    'few clouds': 'sunshine',
    'scattered clouds': 'partlycloudy',
    'overcast clouds': 'partlycloudy',
    'broken clouds': 'partlycloudy',
    'shower rain': 'rain',
    'rain': 'rain',
    'thunder storm': 'storm',
    'snow': 'storm',
    'mist': 'rain'
  }
  console.log('weatherType', props.weatherType);
  console.log('weather icon porops', WeatherImages[weatherTypes[props.weatherType]]);
  return (
    <Image
      source={WeatherImages[weatherTypes[props.weatherType]]}
      style={[styles.weatherImage]}
    />
  )
}

let PredictedEcoliChart = (props) => {
  const fill = 'rgb(65, 174, 244)'
  const data = [50]

  return (<BarChart style={{
      height: 100
    }} data={data} svg={{
      fill
    }} xAccessor={(item) => {
      console.log('howdy!');
      return item;
    }} yMax={500} animate={true} horizontal={true} contentInset={{
      top: 30,
      bottom: 30
    }}>
    <Grid/>
  </BarChart>)
}

let BeachCardDetails = (props) => {

  const eColiCardStyles = StyleSheet.create({contentCardHeader: {
      // color: 'red'
    }})

  return (<View style={[styles.cardShadow, styles.beachViewCard]}>
    <Text style={eColiCardStyles.contentCardHeader}>
      Today's projected reading
    </Text>
    <Text style={styles.boldStat}>
      {props.beachData.eColi}
      E.coli ppm
    </Text>
    <Text>
      The water is exeptionally clean
    </Text>
    {/* <PredictedEcoliChart currentEcoliReading={props.beachData.eColi}/> */}
  </View>)
}

// let BeachImage = (props) => {
//
//   console.log('beach image props', props);
//   return (
//     <View>
//       <Image
//         width={Dimensions.get('window').width}
//         source={Images[beachMap[props.image.beachInfo.beachName]]}
//       />
//     </View>
//   )
//
// }``

let TopSection = (props) => {
  return (<View>
    <Image width={Dimensions.get('window').width} source={Images.hanlans}/>
     {/* <BeachImageSelector
        image={props}
        specificBeachView={true}
      /> */
    }
  </View>)
}

let BodySection = (props) => {
  return (<View style={styles.centerBlock}>
    <WeatherCard weatherData={props.weatherData}/>
    <BeachCardDetails beachData={props.beachData}/>
  </View>)
}

let BeachName = (props) => {

  goBack = () => {
    props.nav.goBack();
  }

  return (<View>
    <TouchableOpacity onPress={this.goBack}>
      <Text style={styles.beachLabel}>
        {props.name}
      </Text>
    </TouchableOpacity>
  </View>)
}

export default class BeachView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beachData: ''
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  componentDidMount() {
    console.log('beach view', this.state);
    // console.log('beach props', this.props);
  }

  componentWillUnmount() {
    console.log('Unmount Beach View');
  }

  render() {
    return (<View style={styles.viewContainer}>
      <BeachName
        name={this.props.navigation.state.params.data.beachName}
        nav={this.props.navigation}
      />
      <ScrollView
        decelerationRate={0.99}
        showsVerticalScrollIndicator={true}
        style={styles.scrollContainer}
        >
        <View style={styles.componentBody}>
          <TopSection
            beachInfo={this.props.navigation.state.params.data}
            nav={this.props}
          />
          <BodySection
            beachData={this.props.navigation.state.params.data}
            weatherData={this.props.navigation.state.params.weather}
          />
        </View>
      </ScrollView>
    </View>);
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  scrollContainer: {
    height: '100%',
    paddingBottom: 20
  },
  currentWeatherCard: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5
  },
  componentBody: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    margin: 'auto',
    flexDirection: 'column',
    paddingBottom: 30
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  weatherImage: {
    width: 10,
    height: 10
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1
  },
  marginRight10: {
    marginRight: 10
  },
  boldStat: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  beachViewCard: {
    padding: 20,
    marginTop: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 40
  },
  superScript: {
    lineHeight: 40
  },
  sunset: {
    flex: 1,
    alignItems: 'flex-end'
  },
  beachLabel: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10
  }
});
