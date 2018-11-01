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
import * as appConst from "../../src/config/Config";
import NewsFeedErrorView from "../../src/components/NewsFeedErrorView";

const screen_width = Dimensions.get("window").width;
const screen_height = Dimensions.get("window").height;

export default class ChannelNewsFeed extends Component {
  constructor() {
    super();
    this.state = {
      resultStatus: 0,
      newsFeedList: []
    };
  }

  async componentWillMount() {
    //https://newsapi.org/v2/everything?sources=bbc-sport&apiKey=API_KEY
    var value = this.props.navigation.state.params.source;
    var news_category_url =
      appConst.NEWS_BASE_URL +
      "everything?sources=" +
      value +
      "&apiKey=" +
      appConst.NEWS_API_KEY;

    fetch(news_category_url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          resultStatus: 1,
          newsFeedList: responseJson.articles,
          isLoading: true
        });
      })
      .catch(error => {
        this.setState({
          resultStatus: 2
        });
      });
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

  render() {
    var NewsFeed;
    if (this.state.resultStatus === 0) {
      NewsFeed = (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.resultStatus === 1) {
      NewsFeed = (
        <View>
          <FlatList
            style={{ flex: 1, width: screen_width }}
            data={this.state.newsFeedList}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity
                  onPress={() => this.onNewsFeedItemClicked(item.url)}
                >
                  <View style={styles.feedItem}>
                    <Image
                      source={{ uri: item.urlToImage }}
                      style={{
                        width: screen_width - 20,
                        height: screen_height / 4,
                        margin: 5
                      }}
                    />
                    <Text style={styles.authorName}>{item.author}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      NewsFeed = (
        <View>
          <NewsFeedErrorView />
        </View>
      );
    }
    return <View style={styles.container}>{NewsFeed}</View>;
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
