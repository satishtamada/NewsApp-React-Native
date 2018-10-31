import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";
import BookmarksListEmptyView from "../../src/components/BookmarksListEmptyView";

const screen_width = Dimensions.get("window").width;
const screen_height = Dimensions.get("window").height;

export default class Bookmarks extends Component {
  constructor() {
    super();
    this.state = {
      bookMarksStatus: 0,
      bookmarksList: []
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.getBookmarksList();
      }.bind(this),
      200
    );
  }

  async getBookmarksList() {
    try {
      const bookmarksString = await AsyncStorage.getItem("@MyStore:bookmarks");
      if (bookmarksString !== null) {
        // We have data!!
        this.setState({
          bookMarksStatus: 1,
          bookmarksList: JSON.parse(bookmarksString)
        });
      } else {
        this.setState({
          bookMarksStatus: 2
        });
      }
    } catch (error) {
      // We have data!!
      this.setState({
        bookMarksStatus: 2
      });
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <NavigationBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
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

  onNewsFeedItemClicked(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  async removeBookmark(position) {
    var array = [...this.state.bookmarksList]; // make a separate copy of the array
    array.splice(position, 1);
    this.setState({ bookmarksList: array });
    try {
      const bookmarksString = JSON.stringify(this.state.bookmarksList);
      await AsyncStorage.setItem("@MyStore:bookmarks", bookmarksString);
    } catch (error) {
      alert("unable to remove bookmark");
    }
  }

  render() {
    var bookmarksList;
    if (this.state.bookMarksStatus === 0) {
      bookmarksList = (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.bookMarksStatus === 1) {
      bookmarksList = (
        <View>
          <FlatList
            style={{ flex: 1, width: screen_width }}
            data={this.state.bookmarksList}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity
                  onPress={() => this.onNewsFeedItemClicked(item.url)}
                >
                  <View style={styles.feedItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: screen_width - 20,
                        height: screen_height / 4,
                        margin: 5
                      }}
                    />
                    <Text style={styles.authorName}>{item.author}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.desc}</Text>
                    <TouchableOpacity
                      onPress={() => this.removeBookmark(item.position)}
                    >
                      <Text style={{ padding: 5 }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      bookmarksList = (
        <View>
          <BookmarksListEmptyView />
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
  },
  listitem: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    backgroundColor: "#ffffff"
  },
  feedItem: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    padding: 10
  },
  authorName: {
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
    padding: 10,
    color: "#90a4a8",
    fontSize: 14
  },
  title: {
    paddingLeft: 10,
    color: "#41676d",
    fontSize: 16,
    fontWeight: "bold"
  },
  description: {
    paddingTop: 5,
    paddingLeft: 10,
    color: "#41676d",
    fontSize: 18,
    flexWrap: "wrap"
  }
});
