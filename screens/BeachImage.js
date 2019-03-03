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

class BeachImage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let specificBeachImage;
    let random = 0;

    if (this.props.beach === 'Sunnyside Beach') {
      random = random + 1;
      specificBeachImage = Images.sunnyside;
    } else if (random === 3 || random === 11) {
      specificBeachImage = Images.cherry
    } else {
      random = random + 1;
      specificBeachImage = Images.hanlans;
    }
    return (
      <View>
        <Image style={styles.cardImage} source={specificBeachImage}/>
      </View>
    );
  }
}
