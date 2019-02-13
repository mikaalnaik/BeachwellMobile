import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions,  Animated, Image, Easing } from 'react-native';
import posed from 'react-native-pose';

let Firebase = require("firebase");
require("firebase/functions");

export default class Splash extends React.Component {
  static navigationOptions = {
     header: null
 }
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.animatedValue = new Animated.Value(0);
  }

  animate = () => {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start()
  }

  componentDidMount () {
    const isVisible = false;

    let collectBeachData = Firebase.functions().httpsCallable('allBeachData');
    collectBeachData().then((result) => {
      console.log('result data', result);

      // let sortedBeach = {
      //   'Toronto Island': [],
      //   'West Toronto': [],
      //   'East Toronto': [],
      // };
      // result.data.map(beach => {
      //   console.log('beach', beach);
      //   // console.log('map beach', beach.beachId);
      //   if (beach.beachId === '1' || '2') {
      //     // console.log('west');
      //       sortedBeach['West Toronto'].push(beach);
      //   } else if (beach.beachId === '3' || '4' || '5' || '6' || '7') {
      //     // console.log('island');
      //     sortedBeach['Toronto Island'].push(beach);
      //   } else {
      //     // console.log('east');
      //     sortedBeach['East Toronto'].push(beach);
      //   }
      // })

      // console.log({sortedBeach});


      this.setState({
        currentBeachData: result.data,
        loading: false,
      })
    })

    this.animate()
     setTimeout(() => {
       if(!this.state.loading) {
         this.props.navigation.navigate('BeachList' , {
           beachData: this.state.currentBeachData
         })
       }
     }, 2200);
  }

  render() {
    const Box = posed.View({
      visible: {
        opacity: 1,
        scaleY: 1,
        transition: {
          opacity: { ease: 'easeOut', duration: 300 },
          default: { ease: 'linear', duration: 500 }
        }
      }
    });

    let fullWidth = Dimensions.get('window').width;
        const marginLeft = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 300]
      })
      const opacity = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
      })
      const movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 300, 0]
      })
      const textSize = this.animatedValue.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [18, 32, 98]
      })
      const rotateX = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '180deg', '0deg']
      })

    return (


        <View style={{
          flex: 1,
          backgroundColor: '#2342A2',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth,
        }}>
        <Box style={styles.box} pose={this.isVisible ? 'visible' : 'hidden'} />

        <Animated.View
          style={{
            opacity,
            marginTop: 10,
            height: 30,
            width: 40,
            // backgroundColor: '#2342A2'
          }}
        />
          <Animated.Text style={{
            opacity,
            fontSize: 30,
            marginTop: 10,
            color: 'white'}}
          >
          Beachwell
        </Animated.Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
  }
});
