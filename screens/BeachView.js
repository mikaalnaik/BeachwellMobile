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
import { Font } from 'expo';
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
  console.log('weather tpe', props.weatherType);

  const weatherTypes = {
    'clear sky': 'sunshine',
    'few clouds': 'sunshine',
    'scattered clouds': 'partlycloudy',
    'overcast clouds': 'partlycloudy',
    'broken clouds': 'partlycloudy',
    'shower rain': 'rain',
    'light intensity shower rain': 'rain',
    'light rain': 'rain',
    'rain': 'rain',
    'thunder storm': 'storm',
    'snow': 'storm',
    'mist': 'rain'
  }
  console.log('weather icon props', props);
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
    <View pointerEvents="none">
     <VictoryChart
      height={100}
      width={350}
      horizontal={true}
      theme={VictoryTheme.material}
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

  console.log('past14', props.pastResults);
  let dataForChart = [];
  props.pastResults.forEach(day => {
    dataForChart.push({x: day.sampleDate, y: Number(day.eColiCount)})
  })
  dataForChart = dataForChart.reverse();

  const latestReadingFromCity = props.pastResults[0].eColiCount
  return (
    <View style={[styles.cardShadow, styles.beachViewCard]} pointerEvents="none">
      <Text style={eColiCardStyles.contentCardHeader}>
        LATEST READING FROM THE CITY
      </Text>
      <Text style={styles.boldStat}>
        Sampled Yesterday
      </Text>
      <Text style={styles.boldStat}>
        {latestReadingFromCity}{' '}
        E.coli ppm
      </Text>
      <View style={styles.chartContainer}>
        <VictoryChart
          height={200}
          width={300}
          padding={40}
          theme={VictoryTheme.material}
          domainPadding={20}
          animate={{ duration: 2000,  }}
          containerComponent={<VictoryContainer style={eColiCardStyles.todayChartContainer}/>}
        >
          <VictoryLine
            height={200}
            interpolation="natural"
            style={{
              data: { stroke: "rgb(19, 55, 116)" },
              parent: { border: "1px solid #ccc"}
            }}
            data={dataForChart}
          />
          <VictoryAxis
            style={{
              tickLabels: {
                fontSize: 10,
                paddingTop: 45,
                paddingLeft: 15,
                angle: 45,
                marginTop: 90,
              }
            }}
            // padding={{left: 40, right: 40, top: 180}}
            // offsetY={20}
            tickCount={7}
          />
          <VictoryAxis
            dependentAxis
          />
        </VictoryChart>
      </View>
    </View>
  )
}

let TopSection = (props) => {
  console.log('top section props', props);
      const beachMap = {
        "Hanlan's Point Beach" : 'hanlans',
        "Gibraltar Point Beach" : 'gibraltar',
        "Sunnyside Beach" : 'sunnyside',
        "Cherry Beach" : 'cherry',
        "Woodbine Beaches" : 'woodbine',
        "Marie Curtis Park East Beach" : 'mariecurtis',
        "Ward's Island Beach" : 'wards',
        "Centre Island Beach" : 'center',
        "Kew Balmy Beach" : 'kewbalmy',
        "Bluffer's Beach Park": 'bluffs',
        "Rouge Beach" : 'rouge',

      }

      return (
        <View>
          <Image
            style={styles.cardImage}
            width={Dimensions.get('window').width}
            source={Images[beachMap[props.nav.navigation.state.params.data.beachName]]}
          />
        </View>
      );
    }


let BodySection = (props) => {
  // console.log('body section props', props);
  return (<View style={styles.centerBlock}>
    <WeatherCard weatherData={props.weatherData}/>
    <BeachCardDetails beachData={props.beachData}/>
    <PastFiveDays
      pastResults={props.pastResults}
    />
  </View>)
}

let BeachName = (props) => {

  goBack = () => {
    props.nav.goBack();
  }

  return (
    <View>
      <TouchableOpacity onPress={this.goBack}>
        <Text style={styles.beachLabel}>
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default class BeachView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beachData: '',
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
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
            pastResults={this.props.navigation.state.params.pastResults}
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
  chartContainer: {
    marginTop: -40,
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
    fontFamily: 'Nunito',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10
  }
});
