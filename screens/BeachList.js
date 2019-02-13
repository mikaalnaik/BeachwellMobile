import React from 'react';
import { StyleSheet, FlatList, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';


export default class BeachList extends React.Component {
  static navigationOptions = {
     header: null,
     gesturesEnabled: false,
 }

 // componentDidMount() {
 //   console.log('beach get here?', this.props);
 // }

 handleScroll(evt){
   console.log('scroll', evt);
 }
 switchScreens(evt) {
   console.log('evvtt', evt);
 }

  render() {

    let fullWidth = Dimensions.get('window').width;
    console.log({fullWidth});

    return (
      <ScrollView onScroll={this.handleScroll.bind(this)}>

        <View style={styles.container} >
          <Text style={styles.mainText}>Howdy</Text>

          <FlatList
            data={this.props.currentBeachData}
            renderItem={({item}) => <Text style={styles.mainText}>
              {item.beachName}

            </Text>}
          />

        </View>
      </ScrollView>
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 50,
    marginBottom: 20,
    color: 'grey',
  },
  beachCard: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: '#000',
    width: 300,
    height: 300,
    padding: 40,
    marginBottom: 20,

  }
});
