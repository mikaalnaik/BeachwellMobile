import React from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Images from '../assets/beachImages';
import WeatherImages from '../assets/weatherImages.js';






export default class NavFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  aboutUsNav = () => {
    this.props.navigation.navigate('AboutUs');
  }

  ferrySchedule = () => {
    console.log('this navigation', this.props.nav);
    this.props.nav.navigate('FerrySchedule');
  }

render() {
 // onPress={() => this.aboutUsNav()}
  // console.log('nav footer props', this.props);

  return (
    <View style={styles.footerNav}>
      <TouchableWithoutFeedback onPress={this.ferrySchedule}>
        <View style={styles.aboutUsContainer}>
          <Text>
            About
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.aboutUsContainer}>
          <Text>
            About
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback >
        <View style={styles.aboutUsContainer}>
          <Text>
            Ferry
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>

  )
  }
}

const styles = StyleSheet.create({
  footerNav: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '5%',
    width: '100%',
    backgroundColor: 'white',
  },
  aboutUsContainer: {
    flex: 1,
    height: 70,
    width: 300,
  },
});
