import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import BeachImageSelector from '../components/BeachImageSelector';
import Images from '../assets/beachImages.js';
import moment from 'moment';


const WARDS_FROM_CITY_MON_FRI = [
  '6:35am', '7:00am', '7:30am', '8:00am',
  '8:45am', '9:45am', '10:45am', '11:45am',
  '12:45pm', '1:45pm', '2:45pm', '3:15pm',
  '3:45pm', '4:15pm', '4:45pm', '5:30pm',
  '6:15pm', '7:00pm', '7:45pm', '8:30pm',
  '9:15pm', '10:00pm', '11:15pm'
];

const WARDS_FROM_ISLAND_MON_FRI = [
  '6:45am', '7:15am', '7:45am', '8:30am',
  '9:00am', '10:00am', '11:00am', '12:00pm',
  '1:00pm', '2:00pm', '3:00pm', '3:30pm', '4:00pm',
  '4:30pm', '5:00pm', '5:45pm', '6:30pm', '7:15pm',
  '8:00pm', '8:45pm','9:30pm', '10:15pm', '11:30pm'
];

const WARDS_FROM_CITY_WEEKENDS = [
  '8:00am', '8:45am', '9:30am', '10:15am', '11:00am', '11:30am',
  '12:00pm', '12:30pm','1:00pm', '1:30pm', '2:00pm', '2:30pm',
  '3:00pm', '3:30pm','4:00pm', '4:30pm','5:00pm', '5:30pm',
  '6:00pm', '6:30pm', '7:00pm', '7:45pm', '8:30pm', '9:15pm',
  '10:00pm', '10:45pm', '11:30pm',
]

const WARDS_FROM_ISLAND_WEEKENDS = [
  '8:30am', '9:15am', '10:00am', '10:45am', '11:15am', '11:45am',
  '12:15pm', '12:45pm', '1:15pm', '1:45pm', '2:15pm', '2:45pm',
  '3:15pm', '3:45pm', '4:15pm', '4:45pm', '5:15pm', '5:45pm',
  '6:15pm', '6:45pm', '7:15pm', '8:00pm', '8:45pm', '9:30pm',
  '10:15pm', '11:00pm', '11:45pm',
]

const CENTRE_FROM_ISLAND_MON_FRI = [
  '8:00am', '9:15am', '9:30am', '10:00am', '10:30am',
  '11:00am', '11:30am', '12:00pm', '12:30pm', '12:00pm', '12:30pm',
]

export default class FerrySchedule extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }


  render() {
    console.log('moment', moment().format());
    return (
        <View style={[styles.beachBodyContent, styles.beachCard]}>
          <Text style={styles.eColiBold}>
            About the project
          </Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({

  beachCard: {
    borderRadius: 10,
    width: 300,
    height: 70,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4.65,
    elevation: 6,
  },
  beachBodyContent: {
    flex: 1,
    color: 'black',
    // alignItems: 'center',
    marginTop: 20,
    marginLeft: 15,
    alignContent: 'center',
    // textAlign: 'center',
  },
  eColiBold: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
