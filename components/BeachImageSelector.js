import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Images from '../assets/index';
import Image from 'react-native-scalable-image';





let BeachImageSelector = (props) => {

  const styles = StyleSheet.create({
    cardImage: {
      height: 200,
      width: 300,
      borderTopLeftRadius: 10
    },
  })

  const beachMap = {
    "Hanlan's Point Beach" : 'hanlans',
    "Gibraltar Point Beach" : 'gibraltar',
    "Sunnyside Beach" : 'sunnyside',
    "Cherry Beach" : 'cherry',
    "Woodbine Beaches" : 'hanlans',
    "Marie Curtis Park East Beach" : 'gibraltar',
    "Ward's Island Beach" : 'sunnyside',
    "Centre Island Beach" : 'cherry',
    "Kew Balmy Beach" : 'hanlans',
     "Bluffer's Beach Park": 'gibraltar',
    "Rouge Beach" : 'sunnyside',
  }


  return (
    // console.log('beah props', props.image.beachInfo.beachName)
    <View>
      <Image
        width={Dimensions.get('window').width}
        source={Images[beachMap[props.image.beachInfo.beachName]]}
      />
    </View>
  )

}
export default BeachImageSelector
