import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";

export default class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      isBookMarksAvailables: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavigationBackButton />,
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: "#0050ff"
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center"
      }
    };
  };

  render() {
    var bookmarksList;
    if (this.state.isBookMarksAvailables) {
      bookmarksList = (
        <View>
          <Text>List</Text>
        </View>
      );
    } else {
      bookmarksList = (
        <View style={styles.emptyBookmarksContainer}>
          <Image
            source={require("../images/ic_empty_bookmarks.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
            NO RESULTS FOUND..!
          </Text>
          <Text style={{ color: "#848080" }}>
            It's seems you don't have bookmarks.
          </Text>
        </View>
      );
    }
    return <View style={styles.container}>{bookmarksList}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyBookmarksContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
