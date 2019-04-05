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

    console.log('beach name', this.props.beachData.beachName);
    return (
        <View style={styles.beachCard} key={this.props.beachData.beachId}>
          <WhichImage beach={this.props.beachData.beachName}/>
          <View style={styles.beachCardBody}>

              {
                this.props.beachData.beachName === 'Marie Curtis Park East Beach' &&
                  <Text style={styles.beachCardText}>
                    Marie Curtis Park
                  </Text>
              }
              {
                this.props.beachData.beachName !== 'Marie Curtis Park East Beach' &&
                <Text style={styles.beachCardText}>
                  {this.props.beachData.beachName}
                </Text>
              }
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
      "Woodbine Beaches" : 'woodbine',
      "Marie Curtis Park East Beach" : 'mariecurtis',
      "Ward's Island Beach" : 'wards',
      "Centre Island Beach" : 'center',
      "Kew Balmy Beach" : 'kewbalmy',
      "Bluffer's Beach Park": 'bluffs',
      "Rouge Beach" : 'rouge',
    }

    return (
      <View style={styles.cardImageBorder}>
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
    // borderWidth: 1,
    borderRadius: 10,
    // borderColor: 'rgb(185, 185, 185)',
    width: 300,
    height: 290,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    // overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  cardImageBorder: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  beachBodyContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eColiBold: {
    fontSize: 23,
    marginLeft: 4,
    fontWeight: 'bold',
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
    height: 90,
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
    fontSize: 31,
    fontWeight: 'bold',
    color: 'rgb(43, 43, 43)'
  }
});
