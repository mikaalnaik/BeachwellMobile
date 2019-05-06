import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Images from '../assets/beachImages';






export default class NavFooter extends React.Component {
  constructor(props) {
    super(props)
  }

  aboutUsNav = () => {
    if(this.props.nav.state.routeName === 'AboutUs') {
      return;
    }
    this.props.nav.navigate('AboutUs');
  }

  ferrySchedule = () => {
    if(this.props.nav.state.routeName === 'FerrySchedule') {
      return;
    }
    this.props.nav.navigate('FerrySchedule');
  }

  beachList = () => {
    if(this.props.nav.state.routeName === 'BeachList') {
      return;
    }
    this.props.nav.navigate('BeachList');
  }

render() {
  return (
    <View style={styles.footerNav}>
      <TouchableWithoutFeedback onPress={this.aboutUsNav}>
        <View style={styles.aboutUsContainer}>
          {
            this.props.nav.state.routeName === 'AboutUsScreen' &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/aboutUsBlue.png')}
            />
          }
          {
            this.props.nav.state.routeName !== 'AboutUsScreen' &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/aboutUsGrey.png')}
            />
          }
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={this.beachList}>
        <View style={styles.navImageContainer}>
          {
            this.props.nav.state.routeName === 'BeachList'
            &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/beachwellBlue.png')}
            />
          }
          {
            this.props.nav.state.routeName === 'BeachView'
            &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/beachwellBlue.png')}
            />
          }
          {
            (this.props.nav.state.routeName !== 'BeachList' && this.props.nav.state.routeName !== 'BeachView')
            &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/beachwellGrey.png')}
            />
          }

        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback  onPress={this.ferrySchedule} >
        <View style={styles.navImageContainer}>
          {
            this.props.nav.state.routeName === 'FerrySchedule' &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/ferryBlue.png')}
            />
          }
          {
            this.props.nav.state.routeName !== 'FerrySchedule' &&
            <Image
              style={[styles.navImage,]}
              source={require('../assets/ferryGrey.png')}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    </View>

  )
  }
}

const styles = StyleSheet.create({
  footerNav: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4.65,
    elevation: 1,
  },
  navImageContainer: {
  },
  navImage: {
    flex: 1,
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
});
