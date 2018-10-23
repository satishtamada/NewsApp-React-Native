import React, { Component } from "react";
import { View, Text, Image } from "react-native";

export default class FeedView extends Component {
  
  
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;

    // author: rowData.author,
    // title: rowData.title,
    // description:rowData.description,
    // url:rowData.url,
    // urlToImage:rowData.urlToImage,
    // publishedAt:rowData.publishedAt

    return (
      <View style={{flexDirection:'column'}}>
        <Text>{params.author}</Text>

        <Text>{params.title}</Text>

        <Text>{params.description}</Text>

        <Text>{params.url}</Text>
        <Text>{params.urlToImage}</Text>
        <Text>{params.publishedAt}</Text>

      </View>
    );
  }
}
