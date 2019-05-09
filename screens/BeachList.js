import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
  View,
  Dimensions,
  AsyncStorage,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import BeachCard from './BeachCard';
import NavFooter from '../components/NavFooter';
import posed from 'react-native-pose';
const Firebase = require("firebase");
require("firebase/functions");


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
    if(await this.getAgreedToTerms() !== 'true') {
      Alert.alert(
        'Disclaimer',
        `The data presented here is predicted by a machine learning models that, like human beings, are subject to errors. Use common sense when swimming. By agreeing, you acknowledge the producers of this app are free from any liability in connection with the use of this information.`,
        [
          {text: 'Agree', onPress: () => this.setAgreedToTerms()},
        ],
        { cancelable: false }
      );
    }
  }

  setAgreedToTerms = async () => {
    await AsyncStorage.setItem('agreedToTerms', 'true');
  }

  getAgreedToTerms = async () => {
    return await AsyncStorage.getItem('agreedToTerms')
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
      <View style={{flex: 1}}>
        <View style={styles.headerCopy}>
          <Text style={styles.greetingText } allowFontScaling={false}>
            Explore today's water quality
          </Text>

        </View>
      <ScrollView  showsVerticalScrollIndicator={true}>
        <View style={styles.statusBar}>
          <StatusBar barStyle={'default'} backgroundColor={'white'}/>
        </View>
        <View style={[
            styles.container, {
              width: this.fullWidth,
              marginBottom: 60,
            }
          ]}>



          <Text style={[styles.beachAreaText]} allowFontScaling={false}>
            Toronto Island
          </Text>
          <View style={styles.areaContainer}>
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

          <Text style={styles.beachAreaText} allowFontScaling={false}>
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

          <Text style={styles.beachAreaText} allowFontScaling={false}>
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
      <NavFooter
        nav={this.props.navigation}
      />
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

  greetingText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 50,
    marginLeft: '7%',
    color:'#464646',
  },
  beachAreaText: {
    marginRight: 'auto',
    marginLeft: '7%',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20,
    color:'#464646',
  },
  headerCopy: {
    height: 100,
  },
  statusBar: {
    backgroundColor: 'white'
  }
});
