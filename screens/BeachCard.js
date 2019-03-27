import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import BeachImageSelector from '../components/BeachImageSelector';
import Images from '../assets/beachImages.js';

export default class BeachCard extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  beachFocus = (beach) => {
    this.props.navigation.navigate('BeachView', {data: beach})
  }

  render() {
    console.log('beach card is trying');
    return (
        <View style={styles.beachCard} key={this.props.beachData.beachId}>
          <WhichImage beach={this.props.beachData.beachName}/>
          <View style={styles.beachCardBody}>
            <Text style={styles.beachCardText}>
              {this.props.beachData.beachName}
            </Text>
            <View style={styles.beachBodyContent}>
              {this.props.beachData.eColi < 100 && <View style={[styles.beachCardConditionSafe, styles.beachConditionBlock]}/>}
              {this.props.beachData.eColi > 100 && <View style={[styles.beachCardConditionUnsafe, styles.beachConditionBlock]}/>}
              <Text style={styles.eColiBold}>
                {this.props.beachData.eColi} E.coli / ppm
              </Text>
            </View>
          </View>
        </View>
    );
  }
}

class WhichImage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const beachMap = {
      "Hanlan's Point Beach" : 'hanlans',
      "Gibraltar Point Beach" : 'gibraltar',
      "Sunnyside Beach" : 'sunnyside',
      "Cherry Beach" : 'cherry',
      "Woodbine Beaches" : 'hanlans',
      "Marie Curtis Park East Beach" : 'gibraltar',
      "Ward's Island Beach" : 'sunnyside',
      "Centre Island Beach" : 'cherry',
      "Kew Balmy Beach" : 'hanlans',
       "Bluffer's Beach Park": 'gibraltar',
      "Rouge Beach" : 'sunnyside',
    }

    return (
      <View>
        <Image
          style={styles.cardImage}
          source={Images[beachMap[this.props.beach]]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  beachCard: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgb(185, 185, 185)',
    width: 300,
    height: 320,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    // overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1
  },
  beachBodyContent: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // fontSize: 28,
    fontWeight: 'bold',
  },
  eColiBold: {
    fontSize: 23,
    marginLeft: 4,
    fontWeight: 'bold',
    // marginTop: 20,
  },
  beachConditionBlock: {
    height: 25,
    width: 25,
    borderRadius: 150,
  },
  beachCardConditionUnsafe: {
    backgroundColor: 'red'
  },
  beachCardConditionSafe: {
    backgroundColor: 'green'
  },
  beachCardBody: {
    height: 120,
    padding: 15,
    paddingTop: 5,
  },
  cardImage: {
    height: 200,
    width: 300,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  beachCardText: {
    // marginTop: 10,
    // marginLeft: 10,
    fontSize: 31,
    fontWeight: 'bold',
    color: 'rgb(43, 43, 43)'
  }
});
