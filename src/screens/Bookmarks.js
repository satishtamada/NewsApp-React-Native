import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";

const bookmarksArray = [];
export default class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      isBookMarksAvailables: false
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.getUserData();
      }.bind(this),
      200
    );
  }

  async getUserData() {
    try {
      const bookmarksString = await AsyncStorage.getItem("@MyStore:bookmarks");
      if (bookmarksString !== null) {
        // We have data!!
        //bookmarksArray = JSON.parse(bookmarksString);

        this.setState({
          isBookMarksAvailables: true
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavigationBackButton navigation={navigation} />,
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
          <Text>Empty list</Text>
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
