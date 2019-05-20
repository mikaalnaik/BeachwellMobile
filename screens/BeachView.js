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
import EcoliReading from '../components/EcoliReading.js';
import WeatherIcon from '../components/WeatherIcon.js';
import Image from 'react-native-scalable-image';
import {Font} from 'expo';
import moment from 'moment';
import BeachImageSelector from '../components/BeachImageSelector';
import posed from 'react-native-pose';
import {BarChart, Grid, YAxis, XAxis} from 'react-native-svg-charts'
import NavFooter from '../components/NavFooter';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer,
  VictoryLine,
  VictoryLabel,
  VictoryTheme
} from "victory-native";
import * as scale from 'd3-scale';
import _ from 'lodash';

const Box = posed.View({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      duration: 1000
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 900
    }
  }
});
let WeatherCard = (props) => {
  return (<View style={[styles.beachViewCard, styles.firstCard, styles.row]}>
    <WeatherIcon
      weatherType={props.weatherData.weather[0].description}
      weatherID={props.weatherData.weather[0]}
    />
    <Text style={[styles.temperature]} allowFontScaling={false}>
      {Math.floor(props.weatherData.main.temp - 273.15)}°C
    </Text>
    <Text style={styles.sunsetText} allowFontScaling={false}>
      Sunset at {moment.unix(props.weatherData.sys.sunset).format('h:mm A')}
    </Text>
  </View>)
}

let PredictedEcoliChart = (props) => {

  const eColiCardStyles = StyleSheet.create({
    todayChartContainer: {
      flex: 1,
      height: 50,
      display: 'flex',
      marginRight: 0,
      right: 20,
      paddingTop: 20,
      paddingLeft: 40,
      width: 80,
      alignSelf: 'center',
      alignContent: 'center',
      backgroundColor: 'beige',
    }
  })

  const data = props.currentEcoliReading
  let topOfDomain;
  let xTickValues;

  if (data < 100) {
    topOfDomain = 120;
    xTickValues = _.range(0, topOfDomain, 10);
  } else {
    topOfDomain = Number(data) + 35;
    xTickValues = _.range(0, topOfDomain, 25);
  }

  const strokeDasharray = "10,1";

  return (
    <View
      pointerEvents="none"
      style={{
        marginTop: -40,
        padding: 10,
        marginLeft: -5
      }}
    >

    <VictoryChart
      horizontal={true}
      width={Dimensions.get('window').width}
      height={140}
      theme={VictoryTheme.material}
      containerComponent={<VictoryContainer
      style = {{
            flex: 1,
            height: 100,
            alignSelf: 'center',
            alignContent: 'center',
          }}
      />}
    >
      <VictoryBar
        animate={{ duration: 1000 }}
        data={[data]}
        barWidth={40}
        cornerRadius={5}
        alignment="start"
        style={{
          data: {
            fill: (data) => data._y > 100
              ? "#c43a31"
              : "#21984F"
          }
        }}/>
      <VictoryAxis
        responsive={true}
        dependentAxis={true}
        style={{
          tickLabels: {
            fontSize: 10,
            angle: 45
          },
          axisLabel: {
            padding: 30,
            lineHeight: 60
          },
          axis: {
            stroke: 'none'
          },
          ticks: {
            stroke: 'none'
          },
          grid: {
            stroke: "rgb(193, 193, 193)",
            strokeDasharray,
            pointerEvents: "painted"
          }
        }}
        tickValues={xTickValues}
        orientation={'bottom'}
        standAlone={true}
        label="E.coli (ppm)"
      />
    </VictoryChart>
  </View>)
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
      alignContent: 'center'
    },
    contentCardHeader: {
      fontSize: 12,
      color: '#919191',
      letterSpacing: .5
    }
  })

  return (<View style={[styles.beachViewCard]}>
    <Text style={styles.contentCardHeader} allowFontScaling={false}>
      TODAY'S PROJECTED READING
    </Text>
    <EcoliReading
      eColiReading={props.beachData.eColi}
    />
    {
      props.beachData.eColi < 100 && <Text style={styles.waterComment} allowFontScaling={false}>
        E. coli levels are below 100ppm, go for it
        </Text>
    }
    {
      props.beachData.eColi > 100 && <Text style={styles.waterComment} allowFontScaling={false}>
          E.coli levels are above 100ppm, use caution.
        </Text>
    }
    <PredictedEcoliChart currentEcoliReading={props.beachData.eColi}/>
  </View>)
}



let PastFiveDays = (props) => {

  let dataForChart = [];
  let maxYValue = 0;
  props.pastResults.forEach(day => {
    dataForChart.push({
      x: day.sampleDate,
      y: Number(day.eColiCount)
    })


    if(Number(day.eColiCount) > maxYValue) {
      maxYValue = Number(day.eColiCount);
    }
  })

  dataForChart = dataForChart.reverse();

  const strokeDasharray = "10,0";

  return (<View style={[styles.beachViewCard,]} pointerEvents="none">
    <Text style={styles.contentCardHeader} allowFontScaling={false}>
      LATEST READING FROM THE CITY
    </Text>
    <EcoliReading
      eColiReading={props.pastResults[0].eColiCount}
    />
    <Text style={styles.waterComment} allowFontScaling={false}>
      Sampled yesterday
    </Text>

    <View
      pointerEvents="none"
      style={{
        marginTop: -20,
        marginLeft: 10,
        flex: 1,
        alignSelf: 'center',
        alignContent: 'center',
      }}
    >
      <VictoryChart
        height={200}
        width={Dimensions.get('window').width / 1.2}
        domainPadding={5}
        containerComponent={ <VictoryContainer
          style = {{
                flex: 1,
                height: 100,
                alignSelf: 'center',
                alignContent: 'center',
              }}
        /> }
      >
        <VictoryLine
          domainPadding={15}
          animate={{ duration: 2000 }}
          height={200}
          data={dataForChart}
          interpolation="natural"
          style={{
            data: {
              stroke: "rgb(19, 55, 116)"
            },
          }}
        />
        <VictoryAxis
          tickCount={7}
          style={{
            axis: {
              stroke: 'none',
            },
            ticks: {
              stroke: 'none'
            },
            grid: {
              stroke: 'none',
            },
            tickLabels: {
              fontSize: 10,
              angle: 45,
            }
          }}
        />
        <VictoryAxis
          dependentAxis={true}

          style={{
            axis: {
              stroke: "none",
            },
            ticks: {
              stroke: 'none'
            },
            grid: {
              stroke: 'lightgrey',
              strokeDasharray,
            }
          }}
        />
      </VictoryChart>
    </View>

  </View>)
}

let TopSection = (props) => {
  const beachMap = {
    "Hanlan's Point Beach": 'hanlans',
    "Gibraltar Point Beach": 'gibraltar',
    "Sunnyside Beach": 'sunnyside',
    "Cherry Beach": 'cherry',
    "Woodbine Beaches": 'woodbine',
    "Marie Curtis Park East Beach": 'mariecurtis',
    "Ward's Island Beach": 'wards',
    "Centre Island Beach": 'center',
    "Kew Balmy Beach": 'kewbalmy',
    "Bluffer's Beach Park": 'bluffs',
    "Rouge Beach": 'rouge'
  }

  return (<View>
    <Image width={Dimensions.get('window').width} source={Images[beachMap[props.nav.navigation.state.params.data.beachName]]}/>
  </View>);
}

let BodySection = (props) => {
  return (<Box pose={props.isVisible
      ? 'enter'
      : 'exit'}>
    <View style={styles.centerBlock}>
      <WeatherCard weatherData={props.weatherData}/>
      <BeachCardDetails beachData={props.beachData}/>
      <PastFiveDays pastResults={props.pastResults}/>
    </View>
  </Box>)
}

let BeachName = (props) => {

  goBack = () => {
    props.nav.goBack();
  }

  return (<View style={[styles.beachViewHeader]}>
    <TouchableOpacity onPress={this.goBack}>
      <Image width={20} style={styles.arrow} source={require('../assets/arrow.png')}/>
        {
          props.name === 'Marie Curtis Park East Beach' &&
          <Text style={styles.beachLabel} allowFontScaling={false}>
              Marie Curtis Park E. Beach
          </Text>
        }
        {
          props.name !== 'Marie Curtis Park East Beach' &&
          <Text style={styles.beachLabel} allowFontScaling={false}>
            {props.name}
          </Text>
        }
    </TouchableOpacity>
  </View>)
}

export default class BeachView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beachData: '',
      isVisible: false
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  componentDidMount() {
    this.setState({isVisible: true})
  }

  render() {
    return (<View style={styles.viewContainer}>
      <BeachName name={this.props.navigation.state.params.data.beachName} nav={this.props.navigation}/>
      <ScrollView decelerationRate={0.99} showsVerticalScrollIndicator={true} style={styles.scrollContainer}>

        <TopSection beachInfo={this.props.navigation.state.params.data} nav={this.props}/>
        <View style={{
            backgroundColor: '#EFEFEF',
            paddingBottom: 100,
          }}>
          <BodySection beachData={this.props.navigation.state.params.data} isVisible={this.state.isVisible} weatherData={this.props.navigation.state.params.weather} pastResults={this.props.navigation.state.params.pastResults}/>
        </View>
      </ScrollView>
      <NavFooter nav={this.props.navigation}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  scrollContainer: {
    height: '100%'
  },
  currentWeatherCard: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EFEFEF'
  },

  weatherImageContainer: {
    height: 50,
    width: 10
  },
  weatherImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },

  marginRight10: {
    marginRight: 10
  },
  boldStat: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: '#464646'
  },
  temperature: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: '#464646',
    marginLeft: '4%',
    marginRight: '4%'
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
    width: '86%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 40
  },
  firstCard: {
    marginTop: -14
  },
  superScript: {
    lineHeight: 40
  },
  arrow: {
    marginTop: 25,
    marginLeft: 20,
    height: 10,
    position: 'absolute'
  },
  beachLabel: {
    fontSize: 22,
    marginTop: 20,
    fontFamily: 'Nunito-Bold',
    color: '#464646',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  beachViewHeader: {
    paddingTop: 30,
    height: 100
  },
  contentCardHeader: {
    fontSize: 12,
    color: '#919191',
    letterSpacing: .5,
    marginBottom: 5
  },
  waterComment: {
    fontFamily: 'Nunito-SemiBoldItalic',
    color: '#464646',
    fontSize: 14
  },
  sunsetText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#464646',
    fontSize: 14
  }
});
