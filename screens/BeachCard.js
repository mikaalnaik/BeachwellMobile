import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, } from 'react-native';
import  Image  from 'react-native-scalable-image';
import posed from 'react-native-pose';
import BeachImageSelector from '../components/BeachImageSelector';
import Images from '../assets/beachImages.js';

const Box = posed.View({
  enter: {
     y: 0,
     opacity: 1,
    delay: 300,
    transition: {
      duration: 400,
    }
   },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 900 }
  }
});

const win = Dimensions.get('window');


export default class BeachCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    this.setState({
      isVisible: true,
    })
  }


  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  beachFocus = (beach) => {
    this.props.navigation.navigate('BeachView', {data: beach})
  }

  render() {
    return (
      <Box style={styles.box} pose={this.state.isVisible ? 'enter' : 'exit'} >

        <View style={styles.beachCard} key={this.props.beachData.beachId}>
          <WhichImage beach={this.props.beachData.beachName}/>
          <View style={styles.beachCardBody}>
            {/* This is to shorten the name of Marie Curtis Park */}
              {
                this.props.beachData.beachName === 'Marie Curtis Park East Beach' &&
                  <Text style={styles.beachCardText} allowFontScaling={false}>
                    Marie Curtis Park
                  </Text>
              }
              {
                this.props.beachData.beachName !== 'Marie Curtis Park East Beach' &&
                <Text style={styles.beachCardText} allowFontScaling={false}>
                  {this.props.beachData.beachName}
                </Text>
              }
            <View style={styles.beachBodyContent}>
              {this.props.beachData.eColi < 100 && <View style={[styles.beachCardConditionSafe, styles.beachConditionBlock]}/>}
              {this.props.beachData.eColi > 100 && <View style={[styles.beachCardConditionUnsafe, styles.beachConditionBlock]}/>}
              <Text style={styles.eColiBold} allowFontScaling={false}>
                {this.props.beachData.eColi} E. coli ppm
              </Text>
            </View>
          </View>
        </View>
      </Box>
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
          width={Dimensions.get('window').width * 0.86}
          background={true}
          source={Images[beachMap[this.props.beach]]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  beachCard: {
    borderRadius: 10,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 5,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  cardImageBorder: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
    height: 190,
  },
  beachBodyContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eColiBold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#464646',
    marginLeft: 8,
  },
  beachConditionBlock: {
    height: 20,
    width: 20,
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
    flex: 1,
    height: undefined,
    height: undefined,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  beachCardText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    color:'#464646',
  }
});
