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
import BeachCard from './BeachCard';

export default class BeachList extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  componentDidMount() {
    // console.log('whioe', this.props.navigation.state.params);
    // console.log('data', this.props.beachData.torontoIsland);
    // console.log('data coming in? ', data);
  }

  handleScroll(evt) {
    // console.log('scroll', evt);
  }
  switchScreens(evt) {
    // console.log('evvtt', evt);
  }

  beachFocus = (beach) => {
    console.log('howdy Folks!');
    this.props.navigation.navigate('BeachView' , {
      data: beach,
    })
  }


  render() {
    return (<ScrollView onScroll={this.handleScroll.bind(this)}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.mainText}>Explore today's beach water quality for Toronto</Text>

        <FlatList data={data.torontoIsland} renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.beachFocus(item)}>
            <View style={styles.beachCard} key={item.beachId} >
              <View style={styles.beachCardContents}>
                <View style={styles.beachcardImage}/>
                <View style={styles.beachCardBody}>
                  <Text style={styles.beachCardText}>
                    {item.beachName}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

        }/>

      </View>
    </ScrollView>);
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
  beachCardBody : {
    height: 90,

  },
  beachCardContents: {
    shadowOpacity: 0,
    elevation: 0,
  },
  beachcardImage: {
    backgroundColor: 'blue',
    height: 200,
  },
  beachCardText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 25,
    color: 'rgb(43, 43, 43)',

  }
});


const data = {
  "eastToronto": [
    {
      "beachId": "8",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.66381,-79.305057",
      "beachName": "Woodbine Beaches",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "19"
    }, {
      "beachId": "9",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.668559,-79.290057",
      "beachName": "Kew Balmy Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "17"
    }, {
      "beachId": "10",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.71363,-79.225948",
      "beachName": "Bluffer's Beach Park",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "13"
    }, {
      "beachId": "11",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.793217,-79.118217",
      "beachName": "Rouge Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "42"
    }
  ],
  "torontoIsland": [
    {
      "beachId": "3",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.619325,-79.393254",
      "beachName": "Hanlan's Point Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "12"
    }, {
      "beachId": "4",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.612487,-79.382173",
      "beachName": "Gibraltar Point Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "10"
    }, {
      "beachId": "5",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.616072,-79.373826",
      "beachName": "Centre Island Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "57"
    }, {
      "beachId": "6",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.630088,-79.352318",
      "beachName": "Ward's Island Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "10"
    }, {
      "beachId": "7",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.636742,-79.344117",
      "beachName": "Cherry Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "12"
    }
  ],
  "westToronto": [
    {
      "beachId": "1",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.585563,-79.540732",
      "beachName": "Marie Curtis Park East Beach",
      "condition": "Safe",
      "date": "September 03 2018",
      "eColi": "38"
    }, {
      "beachId": "2",
      "beachMap": "https://www.google.com/maps?saddr=My+Location&daddr=43.637432,-79.455954",
      "beachName": "Sunnyside Beach",
      "condition": "Unsafe",
      "date": "September 03 2018",
      "eColi": "132"
    }
  ],
}
