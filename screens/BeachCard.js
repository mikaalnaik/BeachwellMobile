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
  TouchableOpacity
} from 'react-native';
// import cherryBeach from './assets/cherry.jpg'
import Images from '../assets/index';




export default class BeachCard extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }


  beachFocus = (beach) => {
    console.log('howdy Folks!');
    this.props.navigation.navigate('BeachView', {data: beach})
  }

  render() {
    return (
        <View style={styles.beachCard} key={this.props.beachData.beachId}>


            <WhichImage beach={this.props.beachData.beachName}/>


        <View style={styles.beachCardContents}>
          <View style={styles.beachCardBody}>
            <Text style={styles.beachCardText}>
              {this.props.beachData.beachName}
            </Text>
            <Text style={styles.beachCardEcoli}>
              <Text styles={styles.eColiBold}>
                {this.props.beachData.eColi}
              </Text>
              e.Coli / ppm
            </Text>
              {
                this.props.beachData.eColi < 100 &&
                <View style={[styles.beachCardConditionSafe, styles.beachConditionBlock]}>

                </View>
              }
              {
                this.props.beachData.eColi > 100 &&
                <View style={[styles.beachCardConditionUnsafe, styles.beachConditionBlock]}>
                </View>
              }


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

  componentDidMount() {



  }

    render() {
      let specificBeachImage;
      let random = 0;
      console.log('props', this.props);

      if(this.props.beach === 'Sunnyside Beach') {
        console.log('howdy!');
        random = random + 1;
        specificBeachImage = Images.sunnyside;
      } else if(random === 3 || random === 11){
        specificBeachImage = Images.cherry
      } else {
        random = random + 1;
        specificBeachImage = Images.hanlans;
      }
      console.log('image,', specificBeachImage);

        return (
            <View>
              <Image
                style={styles.cardImage}
                source={specificBeachImage}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'white',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  mainText: {
    // fontFamily: 'Chalkduster',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'grey'
  },
  beachCard: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgb(185, 185, 185)',
    width: 322,
    height: 320,
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset:  { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
  },
  beachCardEcoli: {
    fontSize: 15,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5,
  },
  eColiBold : {
    fontSize: 25,
    marginRight: 4,
  },
  beachConditionBlock: {
    height: 25,
    width: 25,
    borderRadius: 150,
    marginLeft: 10,
  },
  beachCardConditionUnsafe: {
    backgroundColor: 'red',
  },
  beachCardConditionSafe: {
    backgroundColor: 'green',
  },
  beachCardBody: {
    height: 90,
    padding: 0,
  },
  cardImage: {
    height: 200,
    width:322,
    borderTopLeftRadius: 10
  },
  beachCardContents: {
    shadowOpacity: 0,
    elevation: 0
  },
  beachcardImage: {
    backgroundColor: 'blue',
    height: 200,

  },
  beachCardText: {
    // fontFamily: 'Baskerville-Bold',
    marginTop: 10,
    marginLeft: 10,
    fontSize: 25,
    color: 'rgb(43, 43, 43)'
  }
});
