import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Images from '../assets/index';



export default class BeachView extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  goBack = () => {
    this.props.navigation.navigate('BeachList')
  }

  render() {
    console.log('STYLES: ', styles);
    return (
      <ScrollView
        decelerationRate={0.99}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* < View styles={styles.beachViewHeader}> */}
          {/* <TouchableOpacity onPress={this.goBack}> */}
            {/* <Text>
              Go Back
            </Text> */}
          {/* </TouchableOpacity> */}
          <Text style={styles.beachLabel}>
          {'\<-'}  {this.props.navigation.state.params.data.beachName}
          </Text>
        {/* </View> */}
        <Image
          resizeMode={'contain'}
          style={styles.beachHeaderImg}
          source={Images.hanlans}
        />
      </ScrollView>
    );
  }
}




const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 50,
    paddingBottom: 20,
  },
  beachLabel: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  beachHeaderImg: {
    width: Dimensions.get('window').width,
    // flex: 1  ,
    // position: 'absolute',
  },
});
