import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  FlatList
} from "react-native";
import * as appConst from "../../src/config/Config";
import NavigationBackButton from "../../src/components/NavigationBackButton";
import NewsFeedErrorView from "../../src/components/NewsFeedErrorView";

const screen_width = Dimensions.get("window").width;

export default class NewsFeed extends Component {
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

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      newsFeedList: [],
      resultStatus: 0,
      category: props.category
    };
  }

  async componentWillMount() {
    var value = this.props.navigation.state.params.category;
    var news_category_url =
      appConst.NEWS_CATEGORY +
      value +
      "&country=us&apiKey=" +
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

  onListItemClicked(rowData) {
    this.props.navigation.navigate("FeedView", {
      author: rowData.author,
      title: rowData.title,
      description: rowData.description,
      url: rowData.url,
      urlToImage: rowData.urlToImage,
      publishedAt: rowData.publishedAt
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    var FeedResults;
    if (this.state.resultStatus === 1) {
      FeedResults = (
        <View>
          <FlatList
            style={{ flex: 1, width: screen_width }}
            enableEmptySections={true}
            data={this.state.newsFeedList}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableHighlight
                  onPress={() => this.onListItemClicked(item)}
                >
                  <View style={styles.feedItem}>
                    <View style={{ flexDirection: "column", flex: 0.7 }}>
                      <Text style={styles.authorName}>{item.author}</Text>
                      <Text numberOfLines={2} style={styles.title}>
                        {item.title}
                      </Text>
                      <Text style={styles.publishedAt}>{item.publishedAt}</Text>
                    </View>
                    <Image
                      source={{ uri: item.urlToImage }}
                      style={{
                        flex: 0.3,
                        padding: 10,
                        width: 100,
                        height: 100,
                        backgroundColor: "#c4c4c4"
                      }}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (this.state.resultStatus === 2) {
      FeedResults = (
        <View>
          <NewsFeedErrorView />
        </View>
      );
    } else {
      FeedResults = (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {FeedResults}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: "row"
  },
  authorName: {
    padding: 5,
    color: "#90a4a8",
    fontSize: 13
  },
  title: {
    paddingRight: 5,
    paddingLeft: 5,
    color: "#41676d",
    fontSize: 16
  },
  publishedAt: {
    padding: 12,
    color: "#19cbea",
    fontSize: 10
  }
});
