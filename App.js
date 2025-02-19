import React from 'react';
import Splash from './screens/Splash';
import BeachList from './screens/BeachList';
import BeachView from './screens/BeachView';
import AboutUsScreen from './screens/AboutUsScreen';
import FerrySchedule from './screens/FerrySchedule';
import OffSeason from './screens/OffSeason';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBfXkDbADP7sC_ycYOHNQgzM1d0FD4YNQI",
  authDomain: "torontobeach-44284.firebaseapp.com",
  projectId: "torontobeach-44284",
  storageBucket: "torontobeach-44284.appspot.com",
  messagingSenderId: "671324290931"
};
firebase.initializeApp(config);

const RootStack = createStackNavigator({
  Home: { screen: Splash },
  BeachList: { screen: BeachList },
  BeachView: { screen: BeachView },
  AboutUs: { screen: AboutUsScreen },
  FerrySchedule: { screen: FerrySchedule },
  OffSeason : { screen: OffSeason },
});

const App = createAppContainer(RootStack);


export default App;
