import React, { Component } from "react";
import Expo from "expo";


import MainScreen from "./src/components/MainScreen.js";
// import Camera from "./src/components/Camera.js";
import HomeScreen from "./src/components/HomeScreen.js";
import ProfileScreen from "./src/components/ProfileScreen.js";





import {  StackNavigator,} from 'react-navigation';


export default class Insta extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Billabong: require("native-base/Fonts/Billabong.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <App/>;
  }
}

const App = StackNavigator({ 

  Main: { screen: MainScreen, navigationOptions: { header: null }},

  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },


});