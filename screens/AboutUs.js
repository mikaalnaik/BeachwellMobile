import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import BeachImageSelector from '../components/BeachImageSelector';
import Images from '../assets/beachImages.js';

export default class AboutUs extends React.Component {

  aboutUsNav = () => {
      console.log('howdy folks!');
      console.log('aboutus this', this);
      this.props.navigation.navigation('AboutUs');
  }

  render() {
    console.log('About Us Props', this.props);
    return (
      <TouchableWithoutFeedback onPress={this.aboutUsNav}>
        <View style={[styles.beachBodyContent, styles.beachCard]} {...this.props}>
          <Text style={styles.eColiBold}>
            About the project
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
