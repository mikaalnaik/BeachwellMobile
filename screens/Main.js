import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './Splash';
import Beachlist from './BeachList';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // setTimeout(() => {this.setState({timePassed: true})}, 1000);


    return (
      <View>
        {
          !this.state.timePassed &&

          <Splash/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 30,
    marginBottom: 20,
  }
});
