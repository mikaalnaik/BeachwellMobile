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


const WARDS_FROM_CITY_MON_FRI = ['6:35am', '7am', '7:30am', '8am', '8:45am', '9:45am', '10:45am', '11:45am',
  '12:45pm', '1:45pm', '2:45pm', '3:15pm', '3:45pm', '4:15pm', '4:45pm', '5:30pm', '6:15pm', '7pm', '7:45pm', '8:30pm',
  '9:15pm', '10pm', '11:15pm'
];

const WARDS_FROM_ISLAND_MON_FRI = ['6:45am', '7:15am', '7:45am', '8:30am', '9am', '10am', '11am', '12pm',
  '1pm', '2pm', '3pm', '3:30pm', '4pm', '4:30pm', '5pm', '5:45pm', '6:30pm', '7:15pm', '8pm', '8:45pm',
  '9:30pm', '10:15pm', '11:30pm'
];

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
