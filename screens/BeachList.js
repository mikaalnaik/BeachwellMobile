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
import posed from 'react-native-pose';
const Firebase = require("firebase");
require("firebase/functions");




let FerryCard = () => {
  // render() {
    return (
      <View>
        <Text>
          Ferry Schedule
        </Text>
      </View>
    )
  // }
}


export default class BeachList extends React.Component {
  constructor(props) {
    animationInterval : false,
    super(props)
    this.state = {
      position: 'RIGHT',
      visible: false,
      overlay: false,
      fontLoaded: false,
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  async componentDidMount() {
    this.setState({
      position: 'LEFT',
      visible: true,
      overlay: true,
      fontLoaded: true,
    })
  }

  beachFocus = (beach) => {
    this.props.navigation.navigate('BeachView', {
      data: beach,
      weather: this.props.navigation.state.params.weatherData,
      pastResults: this.props.navigation.state.params.beach14[beach.beachId],
    })
  }

  aboutUsNav = () => {
    this.props.navigation.navigate('AboutUs');
  }

  ferrySchedule = () => {
    this.props.navigation.navigate('FerrySchedule');
  }

  render() {
    let fullWidth = Dimensions.get('window').width;
    StatusBar.setBarStyle('dark-content', true);
    const isVisible = this.state.isVisible;
    const position = this.state.position;
    const visible = this.state.visible
    return (
      <View>
        <View style={styles.headerCopy}>
          <Text style={[styles.greetingText ]}>
            Explore today's water quality
          </Text>

        </View>
      <ScrollView  showsVerticalScrollIndicator={true}>
        <View style={styles.statusBar}>
          <StatusBar barStyle={'default'} backgroundColor={'white'}/>
        </View>
        <View style={[
            styles.container, {
              width: this.fullWidth
            }
          ]}>

          <TouchableWithoutFeedback onPress={() => this.ferrySchedule()}>
            <View>
              <FerryCard/>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.areaContainer}>
            <Text style={[styles.beachAreaText  ]}>
              Toronto Island
            </Text>
              <FlatList
                data={this.props.navigation.state.params.beachToday.torontoIsland}
                animation={this.state.position}
                keyExtractor={(item) => item.beachId}
                renderItem={({item, index}) =>
                    <TouchableWithoutFeedback
                      onPress={() => this.beachFocus(item)}
                      key={item.beachId.toString()}
                    >
                      <View>
                        <BeachCard beachData={item} weatherData={this.state.weatherData}/>
                      </View>
                    </TouchableWithoutFeedback>
                }
              />
          </View>

          <Text style={styles.beachAreaText}>
            West Toronto
          </Text>

          <View style={styles.areaContainer}>
            <FlatList
              data={this.props.navigation.state.params.beachToday.westToronto}
              keyExtractor={(item) => item.beachId}
              renderItem={({item, index}) =>
                  <TouchableWithoutFeedback
                    onPress={() => this.beachFocus(item)}
                    key={item.beachId.toString()}
                  >
                    <View>
                      <BeachCard beachData={item} weatherData={this.state.weatherData}/>
                    </View>
                  </TouchableWithoutFeedback>
                }
              />
          </View>

          <Text style={styles.beachAreaText}>
            East Toronto
          </Text>

          <View style={styles.areaContainer}>
            <FlatList
              data={this.props.navigation.state.params.beachToday.eastToronto}
              keyExtractor={(item) => item.beachId}
              renderItem={({item, index}) =>
                <TouchableWithoutFeedback
                  onPress={() => this.beachFocus(item)}
                  key={item.beachId.toString()}
                >
                  <View>
                    <BeachCard beachData={item} weatherData={this.state.weatherData}/>
                  </View>
                </TouchableWithoutFeedback>
              }
            />
          </View>



          <TouchableWithoutFeedback onPress={() => this.aboutUsNav()}>
            <View style={styles.aboutUsContainer}>
              <Text>
                About The Project
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    textAlign: 'left'
  },
  areaContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  aboutUsContainer: {
    flex: 1,
    height: 70,
    width: 300,
  },
  greetingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 30,
    color:'#464646',
  },
  beachAreaText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    justifyContent: 'flex-start',
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20,
    color:'#464646',
  },
  headerCopy: {
    // flex: 1,
    // width: 300,
    height: 100,
    // backgroundColor: 'beige',
    // position: 'absolute',
  },
  statusBar: {
    backgroundColor: 'white'
  }
});
