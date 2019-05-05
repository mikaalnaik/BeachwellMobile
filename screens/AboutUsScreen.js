import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import NavFooter from '../components/NavFooter';
import * as scale from 'd3-scale';
import _ from 'lodash';



export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beachData: ''
    }
  }
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <ScrollView
          decelerationRate={0.99}
          showsVerticalScrollIndicator={true}
          style={styles.scrollContainer}
          >
            <View style={[styles.aboutUsCard]}>
              <Text style={styles.header} allowFontScaling={false}>
                About the project
              </Text>
              <Text styles={styles.privacyPolicyBody} allowFontScaling={false}>
            This privacy notice discloses the privacy practices for (beachwell.co). This privacy notice applies solely to information collected by this website. It will notify you of the following: What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared. What choices are available to you regarding the use of your data. The security procedures in place to protect the misuse of your information. How you can correct any inaccuracies in the information. Information Collection, Use, and Sharing We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone. We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order. Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy. Your Access to and Control Over Information You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website: See what data we have about you, if any. Change/correct any data we have about you. Have us delete any data we have about you. Express any concern you have about our use of your data. Security We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline. Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page. While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment. If you feel that we are not abiding by this privacy policy, you should contact us immediately via email at steveshearer14@gmail.com.
              </Text>
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
  privacyPolicyBody: {
    fontSize: 9,
  },
  viewContainer: {
    flex: 1
  },
  aboutUsCard : {
    width: '60%',
    margin: 20,
  },
  scrollContainer: {
    height: '100%',
    padding: 20
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1
  },


});
