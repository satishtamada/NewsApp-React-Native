import React, { Component } from "react";
import { View, Text, Image } from "react-native";

export default class FeedView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
      </View>
    );
  }
}
