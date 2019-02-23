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
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
    height: 300,
    marginBottom: 40,
    // shadowColor: '#000',
    // shadowOffset:  { width: 2, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
    // elevation: 1,
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
