import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class EcoliReading extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      eColi: this.props.eColiReading,
      validResult: true,
    }
  }


  componentDidMount() {
    if(isNaN(this.props.eColiReading)) {
      this.setState({
        ecoli: 'Unable to predict',
        invalidResult: false,
      })
    }
  }


  render() {
    return (
        <View>
          {
            this.state.validResult &&
            <Text style={styles.boldStat} allowFontScaling={false}>
              {this.state.eColi}{' '}
              E. coli ppm
            </Text>
          }
          {
            !this.state.validResult &&
            <Text style={styles.boldStat} allowFontScaling={false}>
              {this.state.eColi}{' '}
            </Text>
          }
        </View>
    )
  }
}
const styles = StyleSheet.create({
  boldStat: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: '#464646'
  },
});
