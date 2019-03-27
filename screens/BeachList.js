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
import posed, {Transition} from 'react-native-pose';
const Firebase = require("firebase");
require("firebase/functions");

const AnimatedCard = posed.View({
  RIGHT: {
    y: 150,
    opacity: '0',
    transition: {
      type: 'spring',
      stiffness: 80
    }
  },
  LEFT: {
    y: 0,
    opacity: '1',
    transition: {
      type: 'spring',
      stiffness: 80
    }
  }
})

const AnimatedHeader1 = posed.View({
  false: {
    opacity: '0',
    transition: {
      duration: 600
    }
  },
  true: {
    opacity: '1'
  }
})

const Overlay = posed.View({
  open: {
    y: 0
  },
  closed: {
    y: '100vh'
  }
});



export default class BeachList extends React.Component {
  constructor(props) {
    animationInterval : false,
    super(props)
    this.state = {
      position: 'RIGHT',
      visible: false,
      overlay: false
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  componentDidMount() {
    console.log('HOWdy folks please work');
    this.setState({
      position: 'LEFT',
      visible: true,
      overlay: true,
    })
  }

  beachFocus = (beach) => {
    this.props.navigation.navigate('BeachView', {
      data: beach,
      weather: this.props.navigation.state.params.weatherData
    })
  }

  render() {
    let fullWidth = Dimensions.get('window').width;
    StatusBar.setBarStyle('dark-content', true);
    const isVisible = this.state.isVisible;
    const position = this.state.position;
    const visible = this.state.visible
    return (
      <ScrollView decelerationRate={0.50} showsVerticalScrollIndicator={true}>
        <View style={styles.statusBar}>
          <StatusBar barStyle={'default'} backgroundColor={'white'}/>
        </View>
        <View style={[
            styles.container, {
              width: this.fullWidth
            }
          ]}>
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
            </Overlay>
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

        </View>
      </ScrollView>
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
  greetingText: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 20,
    color: 'black'
  },
  beachAreaText: {
    fontSize: 20,
    justifyContent: 'flex-start',
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20
  },
  headerCopy: {
    flex: 1,
    width: 300
  },
  statusBar: {
    backgroundColor: 'white'
  }
});
