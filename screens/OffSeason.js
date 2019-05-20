import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import NavFooter from '../components/NavFooter';

export default class OffSeason extends React.Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  render() {
    return (<View style={styles.viewContainer}>
      <ScrollView decelerationRate={0.99} showsVerticalScrollIndicator={true} style={styles.scrollContainer}>
        <View style={[styles.aboutUsCard]}>
          <Text style={styles.madeByHeader} allowFontScaling={false}>
            Hey!
          </Text>
          <Text style={styles.header} allowFontScaling={false}>
            Thanks for all the love this year.
          </Text>
          <Text style={styles.aboutUsBody}>
            The City of Toronto only samples the water quality from June to the end of August.
          </Text>
          <Text style={styles.aboutUsBody}>
            Feel free to reach us to us at beachwell.co@gmail.com with any questions, concerns, or feedback about the app. We'd love to hear what you think.
          </Text>
        </View>
      </ScrollView>
      <NavFooter nav={this.props.navigation}/>
    </View>);
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    height: '100%'
  },
  aboutUsCard: {
    width: '80%',
    margin: 30,
    marginTop: 160
  },
  scrollContainer: {
    height: '100%'
  },
  header: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold'
  },
  madeByHeader: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Nunito-Bold'
  },
  aboutUsBody: {
    marginTop: 10,
    marginBottom: 10
  }
});
