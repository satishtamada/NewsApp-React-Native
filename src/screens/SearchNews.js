import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  TextInput
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";
import * as appConst from "../../src/config/Config";
import EmptySearchResultsView from "../../src/components/EmptySearchResultsView";

export default class SearchNews extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      isLoading: false,
      searchResultsStatus: 0,
      resultsList: []
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

  //https://newsapi.org/v2/everything?q=cast&apiKey=API_KEY
  onSearchClicked() {
    if (this.state.value.length === 0) {
      alert("Enter your search text");
    } else {
      Keyboard.dismiss();
      this.setState({
        searchResultsStatus: 1
      });

      var search_url =
        appConst.NEWS_BASE_URL +
        "everything?q=" +
        this.state.value +
        "&apiKey=" +
        appConst.NEWS_API_KEY;
      fetch(search_url)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.articles.length == 0) {
            this.setState({
              searchResultsStatus: 3,
              resultsList: responseJson.articles,
              isLoading: true
            });
          } else {
            this.setState({
              searchResultsStatus: 2,
              resultsList: responseJson.articles,
              isLoading: true
            });
          }
        })
        .catch(error => {
          alert(error);
          this.setState({
            searchResultsStatus: 3
          });
        });
    }
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
    var searchResults;
    if (this.state.searchResultsStatus == 2) {
      searchResults = (
        <View>
          <FlatList
            enableEmptySections={true}
            data={this.state.resultsList}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity onPress={() => this.onListItemClicked(item)}>
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
                        height: 100
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (this.state.searchResultsStatus === 3) {
      searchResults = (
        <View style={{ alignItems: "center", flex: 1 }}>
          <EmptySearchResultsView />
        </View>
      );
    } else if (this.state.searchResultsStatus === 1) {
      searchResults = (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      searchResults = (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Text>Type somthing...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            onChangeText={event => this.setState({ value: event })}
            style={styles.inputText}
            placeholder="Enter your text"
          />
          <TouchableOpacity
            onSubmitEditing={Keyboard.dismiss}
            onPress={() => this.onSearchClicked()}
          >
            <Image
              source={require("../images/ic_search_blue.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        {searchResults}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "#c4c4c4",
    borderBottomWidth: 2,
    shadowColor: "#ff0000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputText: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    padding: 5,
    backgroundColor: "#ffffff",
    borderBottomColor: "#000000",
    borderBottomWidth: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
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
