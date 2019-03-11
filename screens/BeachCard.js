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
// import cherryBeach from './assets/cherry.jpg'
import BeachImageSelector from '../components/BeachImageSelector';

import Images from '../assets/index';

export default class BeachCard extends React.Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }



  beachFocus = (beach) => {
    this.props.navigation.navigate('BeachView', {data: beach})
  }

  render() {
    return (
        <View style={styles.beachCard} key={this.props.beachData.beachId}>
          {/* <BeachImageSelector
            image={this.props}
            beachList={true}
          /> */}
            <WhichImage beach={this.props.beachData.beachName}/>
          <View style={styles.beachCardBody}>
            <Text style={styles.beachCardText}>
              {this.props.beachData.beachName}
            </Text>
            <View style={[styles.beachBodyContent, styles.beachCardText]}>
              {this.props.beachData.eColi < 100 && <View style={[styles.beachCardConditionSafe, styles.beachConditionBlock]}/>}
              {this.props.beachData.eColi > 100 && <View style={[styles.beachCardConditionUnsafe, styles.beachConditionBlock]}/>}
              <Text styles={styles.eColiBold}>
                {this.props.beachData.eColi} e.Coli / ppm
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 28,
    fontWeight: 'bold',
  },
  eColiBold: {
    fontSize: 35,
    marginRight: 4,
    fontWeight: 'bold',
    marginTop: 20,
  },
  beachConditionBlock: {
    height: 25,
    width: 25,
    borderRadius: 150,
    marginLeft: 10
  },
  beachCardConditionUnsafe: {
    backgroundColor: 'red'
  },
  beachCardConditionSafe: {
    backgroundColor: 'green'
  },
  beachCardBody: {
    height: 90,
    padding: 0
  },
  cardImage: {
    height: 200,
    width: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  beachCardText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(43, 43, 43)'
  }
});
