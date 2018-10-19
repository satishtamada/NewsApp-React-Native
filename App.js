import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AppRegistry,
  Platform,
  StyleSheet
} from "react-native";

import { createStackNavigator } from "react-navigation";
import SpalshScreen from "./src/screens/SpalshScreen";

export default class App extends Component {
  render() {
    return <AppStackNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e53e8",
    justifyContent: "center",
    alignItems: "center"
  }
});

const AppStackNavigator = createStackNavigator({
  SpalshScreen: {
    screen: SpalshScreen,
    navigationOptions: {
      header: null
    }
  }
});

AppRegistry.registerComponent("SampleExamples", () => App);
