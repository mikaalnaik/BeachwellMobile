import React from 'react';
import { StyleSheet, ScrollView, Text, View, Linking, TouchableHighlight, } from 'react-native';
import NavFooter from '../components/NavFooter';



export default class OffSeason extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  componentDidMount() {
    console.log('off season', this.props);
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
                The data presented here is predicted by a machine learning model
                that, like human beings, is subject to errors. Use common sense.
              </Text>



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
    flex: 1,
    height: '100%',

  },
  aboutUsCard : {
    width: '80%',
    margin: 30,
    marginTop: 60,
  },
  topMargin: {
    marginTop: 40,
  },
  scrollContainer: {
    height: '100%',
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
