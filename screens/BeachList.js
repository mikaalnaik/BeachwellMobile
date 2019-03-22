import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import BeachCard from './BeachCard';
import posed, { Transition }  from 'react-native-pose';
const Firebase = require("firebase");
require("firebase/functions");



  const AnimatedCard = posed.View({
    RIGHT: {
      y: 150,
      opacity: '0',
    transition: { type: 'spring', stiffness: 80 }
    },
    LEFT: {
      y: 0,
      opacity: '1',
      transition: { type: 'spring', stiffness: 80 }
    },
  })

  const AnimatedHeader1 = posed.View({
    false: {
      opacity: '0',
      transition: { duration: 600 },
    },
    true: { opacity: '1' }
  })

  const Overlay = posed.View({
    open: { y: 0 },
    closed: { y: '100vh' }
  });


export default class BeachList extends React.Component {
  constructor(props){
    animationInterval: false,

    super(props)
    this.state = {
      weatherData: {},
      position: 'RIGHT',
      visible: false,
      overlay: false,
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }




  componentDidMount() {
    let collectBeachData = Firebase.functions().httpsCallable('fetchWeatherData');
    collectBeachData().then((result) => {
      this.setState({ weatherData: result })
      console.log('resulttt', result  );
    })
    // this.animationInerval = setInterval(() => {
      this.setState({
        position: 'LEFT',
        visible: true,
        overlay: true,
      })
    // })
  }


  beachFocus = (beach) => {

    this.props.navigation.navigate('BeachView', {
      data: beach,
      weather: this.state.weatherData,
    })
  }


    componentWillUnmount() {
      console.log('Unmount');
      console.log();
    }

  render() {
    let fullWidth = Dimensions.get('window').width;
    StatusBar.setBarStyle('dark-content', true);
    const isVisible = this.state.isVisible;
    const position = this.state.position;
    const visible = this.state.visible
    console.log('render rstate', this.state);
    return (
      <ScrollView
        decelerationRate={0.50}
        showsVerticalScrollIndicator={true}
        >
        <View style={styles.statusBar}>
          <StatusBar barStyle={'default'} backgroundColor={'white'} />
        </View>
        <View style={[styles.container, {width:this.fullWidth}]}>
          <View style={styles.headerCopy}>
            <AnimatedHeader1 pose={this.state.visible}>
            <Text style={[styles.greetingText, styles.areaContainer]}>
              Explore today's beach water quality for Toronto
            </Text>
          </AnimatedHeader1>
          <AnimatedHeader1 pose={this.state.visible}>
            <Text style={[styles.beachAreaText, styles.areaContainer]}>
              Toronto Island
            </Text>
          </AnimatedHeader1>
          </View>
          <View style={styles.areaContainer}>
            <Overlay pose={this.state.overlay}>
              <FlatList
                data={data.torontoIsland}
                animation={this.state.position}
                keyExtractor={(item) => item.beachId}
                renderItem={({item, index}) =>
                <AnimatedCard pose={this.state.position}>
                  <TouchableWithoutFeedback
                    onPress={() => this.beachFocus(item)}
                    key={item.beachId.toString()}
                  >
                    <View>
                      <BeachCard
                        beachData={item}
                        weatherData={this.state.weatherData}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                 </AnimatedCard>
                }
              />
            </Overlay>
          </View>
            <Text style={styles.beachAreaText}>
              West Toronto
            </Text>
            <View style={styles.areaContainer}>
              <FlatList
                data={data.westToronto}
                keyExtractor={(item) => item.beachId}
                renderItem={({item , index}) =>
                <TouchableWithoutFeedback
                  onPress={() => this.beachFocus(item)}
                  key={item.beachId.toString()}
                 >
                   <View>
                      <BeachCard
                        beachData={item}
                        weatherData={this.state.weatherData}
                      />
                  </View>
                </TouchableWithoutFeedback>}
              />
            </View>

            <Text style={styles.beachAreaText}>
              East Toronto
            </Text>
            <View style={styles.areaContainer}>
              <FlatList
                data={data.eastToronto}
                keyExtractor={(item) => item.beachId}
                renderItem={({item, index}) =>
                <TouchableWithoutFeedback
                  onPress={() => this.beachFocus(item)}
                  key={item.beachId.toString()}
                >
                  <View>
                    <BeachCard
                      beachData={item}
                      weatherData={this.state.weatherData}
                    />
                  </View>
                </TouchableWithoutFeedback>}
              />
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // margin: 0,
    width: '100%',
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    // width: 300,
    marginBottom: 20,
    marginTop: 20,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    color: 'black',
  },
  beachAreaText: {
    fontSize: 20,
    justifyContent: 'flex-start',
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20,
  },
  headerCopy: {
    flex: 1,
    width: 300,
  },
  statusBar: {
    backgroundColor: 'white',
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
