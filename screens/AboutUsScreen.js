import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import NavFooter from '../components/NavFooter';
import * as scale from 'd3-scale';
import _ from 'lodash';



export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beachData: '',
      modalVisible: false,
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  goToPrivacyPolicy = () => {
    Linking.openURL('https://www.beachwell.co/privacy');
  }

  goToEmail = () => {
    Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <ScrollView
          decelerationRate={0.99}
          showsVerticalScrollIndicator={true}
          style={styles.scrollContainer}
          >
            <View style={[styles.aboutUsCard]}>
              <Text style={styles.madeByHeader} allowFontScaling={false}>
                Made by
              </Text>
              <Text style={styles.header} allowFontScaling={false}>
                Mikaal Naik & Steve Shearer
              </Text>
              <Text style={styles.aboutUsBody}>
                If you have any feedback or questions about the project please
                let us know. We'd love to hear what you think. Reach out to us at
                beachwell.co@gmail.com
              </Text>

              <Text style={styles.aboutUsBody}>
                The data presented here is predicted by a machine learning models
                that, like human beings, are subject to errors. Use common sense.
              </Text>

             <Text style={[styles.madeByHeader, styles.topMargin]} allowFontScaling={false}>
               Privacy Policy
             </Text>
             <Text style={styles.aboutUsBody}>
               We don't do anything with your data, ever. But if you want to check out
               our privacy policy, please do.
             </Text>
             <TouchableHighlight
              onPress={() => {
                this.goToPrivacyPolicy();
              }}>
              <Text>Go To Privacy Policy</Text>
            </TouchableHighlight>
            </View>
        </ScrollView>
        <NavFooter
          nav={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  privacyPolicyBody: {
    fontSize: 9,
    lineHeight: 100,
  },
  viewContainer: {
    flex: 1
  },
  aboutUsCard : {
    width: '80%',
    margin: 30,
    marginTop: 60,
  },
  topMargin: {
    marginTop: 60,
  },
  scrollContainer: {
    height: '100%',
    paddingTop: 60,
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
  header: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',

  },
  madeByHeader: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Nunito-Bold',
  },
  aboutUsBody: {
    marginTop: 10,
    marginBottom: 10,
  },

});
