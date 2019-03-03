import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import BeachCard from './BeachCard';
import posed from 'react-native-pose';

export default class BeachList extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  handleScroll(evt) {
    // console.log('scroll', evt);
  }
  switchScreens(evt) {
    // console.log('evvtt', evt);
  }

  beachFocus = (beach) => {
    console.log('Click Beach');
    this.props.navigation.navigate('BeachView', { data: beach })
  }


  render() {
    let fullWidth = Dimensions.get('window').width;

    return (
      <ScrollView onScroll={this.handleScroll.bind(this)}
        decelerationRate={0.99}
        showsVerticalScrollIndicator={true}
        >

        <View style={[styles.container, {width:this.fullWidth}]}>
          <Text style={styles.greetingText}>
            Explore today's beach water quality for Toronto
          </Text>

        <Text style={styles.beachAreaText}>
            Toronto Island
          </Text>
          <View style={styles.areaContainer}>
            <FlatList
              data={data.torontoIsland}
              keyExtractor={(item) => item.beachId}
              renderItem={({item, index}) =>
              <TouchableOpacity
                onPress={() => this.beachFocus(item)}
                key={item.beachId.toString()}
              >
                <BeachCard

                  beachData={item}
                />
              </TouchableOpacity>}
            />
          </View>
            <Text style={styles.beachAreaText}>
              West Toronto
            </Text>
            <FlatList
              data={data.westToronto}
              keyExtractor={(item) => item.beachId}
              renderItem={({item , index}) =>
              <TouchableOpacity
                onPress={() => this.beachFocus(item)}
                key={item.beachId.toString()}
               >
                <BeachCard
                  beachData={item}
                />
              </TouchableOpacity>}
            />


            <Text style={styles.beachAreaText}>
              East Toronto
            </Text>
          <FlatList
            data={data.eastToronto}
            keyExtractor={(item) => item.beachId}
            renderItem={({item, index}) =>
            <TouchableOpacity
              onPress={() => this.beachFocus(item)}
              key={item.beachId.toString()}
            >
              <BeachCard
                beachData={item}
              />
            </TouchableOpacity>}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // margin: 0,
    width: '100%',
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 15,
    textAlign: 'left',

  },
  areaContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 25,
    width: 300,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'black',
  },
  beachAreaText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20,
  },
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
  ]
}
