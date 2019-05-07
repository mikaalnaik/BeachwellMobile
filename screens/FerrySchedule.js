import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Linking,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import BeachImageSelector from '../components/BeachImageSelector';
import posed from 'react-native-pose';

import NavFooter from '../components/NavFooter';
import Images from '../assets/beachImages.js';
import Image from 'react-native-scalable-image';
import moment from 'moment';
import _ from 'lodash';

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


const WARDS_FROM_CITY_MON_FRI = [
  '6:35am', '7:00am', '7:30am', '8:00am',
  '8:45am', '9:45am', '10:45am', '11:45am',
  '12:45pm', '1:45pm', '2:45pm', '3:15pm',
  '3:45pm', '4:15pm', '4:45pm', '5:30pm',
  '6:15pm', '7:00pm', '7:45pm', '8:30pm',
  '9:15pm', '10:00pm', '11:15pm'
];

const WARDS_FROM_ISLAND_MON_FRI = [
  '6:45am', '7:15am', '7:45am', '8:30am',
  '9:00am', '10:00am', '11:00am', '12:00pm',
  '1:00pm', '2:00pm', '3:00pm', '3:30pm', '4:00pm',
  '4:30pm', '5:00pm', '5:45pm', '6:30pm', '7:15pm',
  '8:00pm', '8:45pm','9:30pm', '10:15pm', '11:30pm'
];

const WARDS_FROM_CITY_WEEKEND = [
  '8:00am', '8:45am', '9:30am', '10:15am', '11:00am', '11:30am',
  '12:00pm', '12:30pm','1:00pm', '1:30pm', '2:00pm', '2:30pm',
  '3:00pm', '3:30pm','4:00pm', '4:30pm','5:00pm', '5:30pm',
  '6:00pm', '6:30pm', '7:00pm', '7:45pm', '8:30pm', '9:15pm',
  '10:00pm', '10:45pm', '11:30pm',
]

const WARDS_FROM_ISLAND_WEEKEND = [
  '8:30am', '9:15am', '10:00am', '10:45am', '11:15am', '11:45am',
  '12:15pm', '12:45pm', '1:15pm', '1:45pm', '2:15pm', '2:45pm',
  '3:15pm', '3:45pm', '4:15pm', '4:45pm', '5:15pm', '5:45pm',
  '6:15pm', '6:45pm', '7:15pm', '8:00pm', '8:45pm', '9:30pm',
  '10:15pm', '11:00pm', '11:45pm',
]

const CENTRE_FROM_ISLAND_MON_FRI = [
  '8:00am', '9:15am', '9:30am', '10:00am', '10:30am',
  '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm',
  '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm',
  '5:00pm', '5:30pm', '6:00pm', '6:30pm','7:00pm', '7:30pm',
  '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:45pm', '11:15pm'
]

const CENTRE_FROM_CITY_MON_FRI = [
  '8:15am', '9:30am', '9:45am', '10:15am', '10:45am', '11:15am',
  '11:45am', '12:15pm', '12:45pm', '1:15pm', '1:45pm',
  '2:15pm', '2:45pm', '3:15pm', '3:45pm', '4:15pm', '4:45pm',
  '3:15pm', '3:45pm',  '4:15pm', '4:45pm', '5:15pm', '5:45pm',
  '6:15pm', '6:45pm', '7:15pm', '7:45pm', '8:15pm', '8:45pm',
  '9:15pm', '9:45pm', '10:15pm', '11:00pm', '11:45pm'
]

const CENTRE_FROM_CITY_WEEKEND = [
  '8:00am', '8:30am', '9:00am' , '9:15am', '9:30am', '9:45am', '10:00am',
  '10:15am', '10:30am', '10:45am', '11:00am', '11:15am', '11:30am', '11:45am',
  '12:00pm', '12:15pm', '12:30pm', '12:45pm','1:00pm', '1:15pm', '1:30pm', '1:45pm',
  '2:00pm', '2:15pm', '2:30pm', '2:45pm', '3:00pm', '3:15pm', '3:30pm', '3:45pm',
  '4:00pm' ,'4:15pm', '4:30pm', '4:45pm', '5:00pm', '5:15pm', '5:30pm', '5:45pm',
  '6:00pm' ,'6:15pm', '6:30pm', '6:45pm', '7:00pm', '7:15pm', '7:30pm', '7:45pm',
  '8:00pm', '8:15pm', '8:30pm', '8:45pm', '9:00pm' ,'9:15pm', '9:30pm', '10:00pm',
  '10:30pm', '11:00pm', '11:30pm',
]

const CENTRE_FROM_ISLAND_WEEKEND = [
  '8:15am', '8:45am', '9:15am', '9:30am', '9:45am', '10:00am', '10:15am',
  '10:30am', '10:45am' ,'11:00am', '11:15am', '11:30am', '11:45am', '12:00pm', '12:15pm', '12:30pm', '12:45pm',
  '1:00pm', '1:15pm', '1:30pm', '1:45pm', '2:00pm', '2:15pm', '2:30pm', '2:45pm',
  '3:00pm', '3:15pm', '3:30pm', '3:45pm', '4:00pm', '4:15pm', '4:30pm', '4:45pm',
  '5:00pm', '5:15pm', '5:30pm', '5:45pm', '6:00pm', '6:15pm', '6:30pm', '6:45pm',
  '7:00pm', '7:15pm', '7:30pm', '7:45pm', '8:00pm', '8:15pm', '8:30pm', '8:45pm',
  '9:00pm', '9:15pm', '9:30pm', '9:45pm', '10:15pm', '10:45pm', '11:15pm', '11:45pm',
]

const HANLANS_FROM_CITY_MON_FRI = [
  '6:30am', '7:00am', '7:30am', '9:00am', '9:30am','10:00am', '10:30am',
  '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm',
  '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:45pm', '5:30pm', '6:15pm',
  '7:00pm', '7:45pm', '8:30pm', '9:15pm', '10:00pm',
]


const HANLANS_FROM_ISLAND_MON_FRI = [
  '6:45am', '7:15am', '7:45am', '9:15am', '9:45am', '10:15am',
  '10:45am', '11:15am', '11:45am', '12:15pm', '12:45pm',
  '1:15pm', '1:45pm' , '2:15pm', '2:45pm', '3:15pm', '3:45pm', '4:15pm',
  '5:15pm', '6:00pm', '6:45pm', '7:30pm', '8:15pm', '9:00pm', '9:45pm',
  '10:30pm',
]

const HANLANS_FROM_CITY_WEEKEND = [
  '8:00am', '8:45am', '9:30am', '10:15am', '10:45am', '11:15am', '11:45am',
  '12:15pm', '12:45pm', '1:15pm', '1:45pm', '2:15pm', '2:45pm', '3:15pm', '3:45pm',
  '4:15pm', '4:45pm', '5:15pm', '5:45pm', '6:15pm', '7:00pm', '7:45pm', '8:30pm',
  '9:15pm', '10:00pm', '10:45pm',
]

const HANLANS_FROM_ISLAND_WEEKEND = [
  '8:15am', '9:00am', '9:45am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm',
  '1:00pm', '1:30pm', '2:00pm', '2:30pm',  '3:00pm', '3:30pm',  '4:00pm', '4:30pm',
  '5:00pm', '5:30pm',  '6:00pm', '6:30pm', '7:30pm', '8:15pm', '9:00pm', '9:45pm', '10:30pm',
  '11:15pm'
]


let LineBreak = () => {
  return (
    <View
      style={{
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: 1,
      }}
    />
  )
}


class Ferry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upcomingTimes: [],
      isVisible: false,
    }
  }

  componentDidMount() {
    this.setState({isVisible: true});
    // this.determineSchedule();
    this.setState(this.determineSchedule())

  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      let schedule = this.determineSchedule()
      this.setState(schedule)

    }
  }


  determineSchedule() {
    let schedule;
    let currentTime = moment().format('h:mm:a');
    if(this.props.port === 'hanlans') {
      schedule = {
        MON_FRI: {
          city: HANLANS_FROM_ISLAND_MON_FRI,
          island: HANLANS_FROM_CITY_MON_FRI,
        },
        WEEKEND: {
          city: HANLANS_FROM_ISLAND_WEEKEND,
          island: HANLANS_FROM_CITY_WEEKEND,
        }
      }
    } else if (this.props.port === 'center') {
      schedule = {
        MON_FRI: {
          city: CENTRE_FROM_ISLAND_MON_FRI,
          island: CENTRE_FROM_CITY_MON_FRI,
        },
        WEEKEND: {
          city: CENTRE_FROM_ISLAND_WEEKEND,
          island: CENTRE_FROM_CITY_WEEKEND,
        }
      }
    } else if (this.props.port === 'wards') {
      schedule = {
        MON_FRI: {
          city: WARDS_FROM_ISLAND_MON_FRI,
          island: WARDS_FROM_CITY_MON_FRI,
        },
        WEEKEND: {
          city: WARDS_FROM_ISLAND_WEEKEND,
          island: WARDS_FROM_CITY_WEEKEND,
        }
      }
    }

    let displayedSchedule = schedule[this.props.dayOfWeek][this.props.directionOfTravel];


    let differenceInTime = displayedSchedule.map(time => {
      let duration = moment(currentTime, 'h:mm:a').diff(moment(time, 'h:mm:a'))
      return {time: time, duration: duration}
    })
    let sortedTime = [];
    let sortedSchedule = _.sortBy(differenceInTime, 'duration');
    let filteredSchedule = _.filter(sortedSchedule, (i) => {
      return i.duration < 0;
    });
    filteredSchedule.reverse()
    filteredSchedule.forEach(entry => {
      if(entry.duration < 0 && sortedTime.length < 4) {
        sortedTime.push(entry.time)
      }
    })

    let nextTime = sortedTime.shift();
    return {
      nextTime: nextTime,
      upcomingTimes: sortedTime,
      lastFerryFromIsland: displayedSchedule[displayedSchedule.length - 1]
    }
  }

  buyTicket = () => {
    Linking.openURL('https://secure.toronto.ca/FerryTicketOnline/tickets/index.jsp');
  };

  render() {
    return (
      <Box style={{flex: 1, width: '80%',}} pose={this.state.isVisible ? 'enter' : 'exit'} >

        <View style={[styles.specificSchedule, this.props.port === 'hanlans' && styles.firstCard ]}>
          <Text style={styles.portName}>
            {this.props.label}
          </Text>
          <Text style={styles.nextFerrySubheader}>
            NEXT FERRY
          </Text>
          <LineBreak/>
          <View>
            <TextInput
              editable={false}
              style={[styles.listItem, styles.nextTime]}
            >
              {this.state.nextTime}
            </TextInput>
            <LineBreak/>
          <FlatList
            data={this.state.upcomingTimes}
            keyExtractor={(item, index) => item}
            renderItem={({item}) =>
            <View>
              <TextInput
                editable={false}
                style={styles.listItem}
              >
                {item}
              </TextInput>
              <LineBreak/>
              </View>
            }
          />
        </View>
          <View style={styles.ferryInfo}>
            <View style={styles.ticketBlock}>
              <Text style={styles.lastFerrytext}>
                Last ferry leaves:
              </Text>
              <Text style={styles.lastFerrytime}>
                {this.state.lastFerryFromIsland}
              </Text>
            </View>
            <TouchableWithoutFeedback onPress={this.buyTicket}>
              <View style={styles.buyButtonStyle}>
                <Text style={[styles.buybuttonText,]}>
                  BUY TICKET
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Box>
    )
  }
}


export default class FerrySchedule extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true,
  }

  constructor(props){
    super(props)
    this.state = {
      dayOfWeek: 'MON_FRI',
      directionOfTravel: 'island',
      ferryImage: 'ferryIsland',
    }
  }

  componentDidMount() {

    let day = moment().days();
    if(day === 0 || day === 6) {
      day = 'WEEKEND'
    } else {
      day = 'MON_FRI'
    }
    this.setState({
      dayOfWeek: day,
    })
  }

 directionOfTravel = (direction) => {
   if(direction === this.state.directionOfTravel) {
     return;
   }
    if(direction === 'city') {
      this.setState({
        ferryImage: 'ferryCity',
        directionOfTravel: 'city',
      })
    }
    if(direction === 'island') {
      this.setState({
        ferryImage: 'ferryIsland',
        directionOfTravel: 'island',
      })
    }
    return;
  }


  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center',}}>
        <ScrollView  showsVerticalScrollIndicator={true}>
            <View style={styles.buttonContainer}>

              <TouchableWithoutFeedback onPress={() => this.directionOfTravel('island')}>
                <View style={[styles.directionPicker,styles.directionButton,  styles.directionIsland, this.state.directionOfTravel === 'island' && styles.active]}>
                  <Text style={[styles.directionText, this.state.directionOfTravel === 'island' && styles.textActive]}>
                    TO THE ISLAND
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.directionOfTravel('city')}>
                <View style={[styles.directionPicker, styles.directionButton, styles.directionCity, this.state.directionOfTravel === 'city' && styles.active]}>
                  <Text style={[styles.directionText, this.state.directionOfTravel === 'city' && styles.textActive]}>
                    TO THE CITY
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

          <View style={styles.screen}>
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width}
              source={Images[this.state.ferryImage]}
            />

            <View>
            </View>
            {
              this.state.dayOfWeek &&
              <View style={styles.scheduleContainer} >
                <Ferry
                  directionOfTravel={this.state.directionOfTravel}
                  port={'hanlans'}
                  label={'Hanlan\s Point'}
                  dayOfWeek={this.state.dayOfWeek}
                  time={this.state.time}
                />
                <Ferry directionOfTravel={this.state.directionOfTravel}
                  port={'center'}
                  label={'Centre Island'}
                  dayOfWeek={this.state.dayOfWeek}
                  time={this.state.time}
                />
                <Ferry directionOfTravel={this.state.directionOfTravel}
                  port={'wards'}
                  label={'Wards Island'}
                  dayOfWeek={this.state.dayOfWeek}
                  time={this.state.time}
                />
              </View>
            }
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
  screen: {
    marginTop: 40,
    marginBottom: 40,
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  active: {
    backgroundColor: '#2342A2',
  },
  textActive : {
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
    width: '100%',

  },
  directionButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    height: 36,
    color: '#464646',
    paddingLeft: 10,
    paddingRight: 10,
  },
  directionCity: {
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },
  directionIsland: {
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  buttonWrapper: {
  },

  directionText: {
    fontFamily: 'Nunito-Bold',
    letterSpacing: .5,
    fontSize: 12,
  },
  buybuttonText: {
    fontFamily: 'Nunito-Bold',
    letterSpacing: .5,
    color: 'white',
    fontSize: 14,
  },

  buyButtonStyle: {
    alignItems:'center',
    justifyContent:'center',
    height: 40,
    backgroundColor: '#2342A2',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 50,
  },

  directionPicker: {
    padding: 5,
  },
  scheduleContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    width: '100%',
    marginTop: -14,
    paddingBottom: 34,
    backgroundColor: '#EFEFEF'
  },
  ferryTimeList: {
    height: '100%',
  },
  ferryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ticketBlock: {
    marginTop:0,
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  listItem: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Nunito-Bold',
    color: '#464646',
  },
  nextFerrySubheader: {
    borderBottomColor: '#919191',
    borderBottomWidth: 0.8,
    borderTopWidth: 0,
    fontSize: 12,
    width: '50%',
    color: '#919191',
    letterSpacing: .5,
    paddingBottom: 5,
  },
  nextTime: {
    fontSize: 25,
  },
  portName: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: 'Nunito-Bold',
    color: '#464646',
  },
  specificSchedule: {
    flex: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: 'white',
  },
  lastFerrytext:{
    fontFamily: 'Nunito-SemiBoldItalic',
    fontSize: 14,
    color: '#464646',
  },
  lastFerrytime: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: '#464646',
  },
  firstCard: {
    marginTop: -14  ,
  },
});
