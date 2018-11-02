import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class EmptySearchResultsView extends Component {
  render() {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("../images/ic_no_results.png")}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
          EMPTY RESULTS FOUND..!
        </Text>
        <Text style={{ color: "#848080" }}>
          Sorry we could't find your search results .
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
