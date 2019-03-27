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
import { VictoryBar, VictoryChart, VictoryAxis, VictoryContainer, VictoryLine, VictoryLabel, VictoryTheme } from "victory-native";
import * as scale from 'd3-scale';
import _ from 'lodash';

let WeatherCard = (props) => {
  return (
    <View style={[styles.beachViewCard, styles.cardShadow, styles.row]}>
      <WeatherIcon weatherType={props.weatherData.weather[0].description}/>
      <Text style={[styles.boldStat, styles.marginRight10]}>
        {Math.floor(props.weatherData.main.temp - 273.15)}°C
      </Text>
      <Text style={styles.sunset}>
        Sunset at {new Date(props.weatherData.sys.sunset).toLocaleTimeString("en-US")}
      </Text>
    </View>
  )
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
  return (
    <Image
      source={WeatherImages[weatherTypes[props.weatherType]]}
      style={[styles.weatherImage]}
    />
  )
}


let PredictedEcoliChart = (props) => {

  const eColiCardStyles = StyleSheet.create({
    todayChartContainer: {
      flex: .5,
      height: 50,
      display: 'flex',
      marginRight: 0,
      right: 20,
      paddingTop: 20,
      paddingLeft: 40,
      width: 80,
      alignSelf: 'center',
      alignContent: 'center',
    },
  })

  const data = props.currentEcoliReading
  let topOfDomain;
  let xTickValues;

  if (data < 100 ) {
    topOfDomain = 120;
    xTickValues = _.range(0, topOfDomain , 10);
  } else {
    topOfDomain = Number(data) + 35;
      xTickValues = _.range(0, topOfDomain , 25);
  }


  return (
    <View>
     <VictoryChart
      height={100}
      width={350}
      horizontal={true}
      containerComponent={<VictoryContainer style={eColiCardStyles.todayChartContainer}/>}
     >
      <VictoryBar
        animate={{ duration: 1000 }}
        data={[data]}
        barWidth={40}
        alignment="start"
        height={100}
        width={150}
        style={{
          data: {
            fill: (data) => data._y > 100 ? "#c43a31" : "#21984F",
          }
        }}
      />
       <VictoryAxis
          responsive={false}
          dependentAxis
          height={100}
          width={150}
          tickValues={xTickValues}
          orientation={'bottom'}
          padding={{left: 40, right: 40, bottom: 0, top: 0}}
        />
     </VictoryChart>
   </View>
)
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
      {props.beachData.eColi} {' '}
      E.coli ppm
    </Text>
    <Text>
      The water is exeptionally clean
    </Text>
    <PredictedEcoliChart
      currentEcoliReading={props.beachData.eColi}
    />
  </View>)
}


let PastFiveDays = (props) => {

  return (
    <View style={[styles.cardShadow, styles.beachViewCard]}>
      <VictoryChart
        height={200}
        width={350}
      >
        <VictoryLine
          height={200}
          animate={{ duration: 1000 }}
          interpolation="natural"
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc"}
          }}
          data={[
            { x: '06/14', y: 12 },
            { x: '06/15', y: 32 },
            { x: '06/16', y: 15 },
            { x: '06/17', y: 40 },
            { x: '06/18', y: 70  },
            { x: '06/19', y: 12 },
            { x: '06/20', y: 32 },
            { x: '06/21', y: 15 },
            { x: '06/22', y: 40 },
            { x: '06/23', y: 70  },
            { x: '06/24', y: 32 },
            { x: '06/25', y: 15 },
            { x: '06/26', y: 40 },
            { x: '06/27', y: 70  },
          ]}
        />
      </VictoryChart>
    </View>
  )
}

let BeachImage = (props) => {
  return (
    <View>
      <Image
        width={Dimensions.get('window').width}
        source={Images[beachMap[props.image.beachInfo.beachName]]}
      />
    </View>
  )

}

let TopSection = (props) => {
  return (
    <View>
      <Image width={Dimensions.get('window').width} source={Images.hanlans}/>
    </View>
  )
}

let BodySection = (props) => {
  console.log('body section props', props);
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
    console.log('beachViewState', this.state);
    console.log('BeachViewProps', this.props);
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
          <PastFiveDays
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
    flex: 1,
    flexDirection: 'column',
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
