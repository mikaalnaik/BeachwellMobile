import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';

export default class BeachCard extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  componentDidMount() {
    // console.log('whioe', this.props.navigation.state.params);
    // console.log('data', this.props.beachData.torontoIsland);
    // console.log('data coming in? ', data);
    console.log('this props in card', this.props);
  }


  beachFocus = (beach) => {
    console.log('howdy Folks!');
    this.props.navigation.navigate('BeachView', {data: beach})
  }

  render() {
    return (
        <View style={styles.beachCard} key={this.props.beachData.beachId}>
        <View style={styles.beachCardContents}>
          <View style={styles.beachcardImage}/>
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
                <Text style={[styles.beachCardConditionSafe, styles.beachConditionBlock]}>
                  CLEAN AND SAFE TO ENJOY
                </Text>
              }
              {
                this.props.beachData.eColi > 100 &&
                <Text style={[styles.beachCardConditionUnsafe, styles.beachConditionBlock]}>
                  EXCEEDS SAFE LEVEL OF ECOLI
                </Text>
              }


          </View>
        </View>
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
    borderRadius: 5,
    borderColor: 'rgb(185, 185, 185)',
    width: 300,
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
    marginLeft: 10,
    padding: 5,
    width: 185,
    color: 'white',
  },
  beachCardConditionUnsafe: {
    backgroundColor: 'red',
  },
  beachCardConditionSafe: {
    backgroundColor: 'green',
  },
  beachCardBody: {
    height: 90
  },
  beachCardContents: {
    shadowOpacity: 0,
    elevation: 0
  },
  beachcardImage: {
    backgroundColor: 'blue',
    height: 200
  },
  beachCardText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 25,
    color: 'rgb(43, 43, 43)'
  }
});
