import React, { Component } from "react";
import { WebView } from "react-native";

export default class NewsWebView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    return <WebView       
      source={{uri: params.url}}
    />;
  }
}
