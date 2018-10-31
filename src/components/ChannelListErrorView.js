import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class ChannelListErrorView extends Component {
  render() {
    return (
      <View style={styles.emptyChannelsContainer}>
        <Image
          source={require("../images/ic_empty_channel.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
          NO RESULTS FOUND..!
        </Text>
        <Text style={{ color: "#848080" }}>
          Unable to fetch the channels list..! Try again.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyChannelsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
