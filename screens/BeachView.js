import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  // Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Images from '../assets/index';
import Image from 'react-native-scalable-image';
import { BarChart, Grid } from 'react-native-svg-charts'


let WeatherCard = (props) => {
  return (
    <View style={[styles.beachViewCard, styles.cardShadow, styles.row]}>
      <Image
        source={Images.sunshine1}
        style={styles.marginRight10}
      />
      <Text style={[styles.boldStat, styles.marginRight10]}>
        23°C
      </Text>
      <Text>
        Sunset at 8:53pm
      </Text>
    </View>
  )
}



let BarChartExample = () => {
  const fill = 'rgb(134, 65, 244)'
  const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]

  return (
      <BarChart
          style={{ height: 200 }}
          data={ data }
          svg={{ fill }}
          contentInset={{ top: 30, bottom: 30 }}
      >
          <Grid/>
      </BarChart>
  )
}

let BeachCardDetails = (props) => {

  const eColiCardStyles = StyleSheet.create({
    contentCardHeader: {
      color: 'red'
    }
  })

  return (
    <View style={[styles.cardShadow, styles.beachViewCard]}>
      <Text style={eColiCardStyles.ccontentCardHeader}>
        Today's projected reading
      </Text>
      <Text style={styles.boldStat}>
        {props.beachData.eColi} E.coli ppm
      </Text>
      <Text>
        The water is exeptionally clean
      </Text>

    </View>
  )
}

let TopSection = (props) => {
  return (
    <View>
      <Image
        width={Dimensions.get('window').width}
        source={Images.hanlans}
      />
    </View>
  )
}

let BodySection = (props) => {
  return (
    <View styles={styles.centerBlock}>
      <WeatherCard />
      <BeachCardDetails
        beachData={props.beachData}
      />
    </View>
  )
}

let BeachName = (props) => {

  goBack = () => {
    props.nav.navigate('BeachList');
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
    gesturesEnabled: false
  }



  render() {
    return (
      <View>
        <BeachName
          name={this.props.navigation.state.params.data.beachName}
          nav={this.props.navigation}
        />
      <ScrollView
        decelerationRate={0.99}
        showsVerticalScrollIndicator={true}
        style={{height: '100%'}}
      >
        <View style={styles.componentBody}>
          <TopSection
            beachInfo={this.props.navigation.state.params.data}
            nav={this.props}
          />
          <BodySection
            beachData={this.props.navigation.state.params.data}
          />
          <BarChartExample/>
        </View>
      </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 35,
  },
  currentWeatherCard: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  componentBody: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    margin: 'auto',
    flexDirection: 'column',
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingLeft: '10%',
    paddingRight: '10%',
    marginRight: 10,
    marginLeft: 10,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
  },
  marginRight10: {
    marginRight: 10,
  },
  boldStat: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  beachViewCard : {
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    // width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 40,
  },
  beachLabel: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },
});
