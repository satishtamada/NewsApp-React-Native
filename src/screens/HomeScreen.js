import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  ListView
} from "react-native";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import * as appConst from "../../src/config/Config";
import PagerItem from "../../src/components/PagerItem";

var feed = [];
const screenWidth = Dimensions.get("window").width;
export default class HomeScreen extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(feed),
      isLoading: false
    };
  }

  async componentWillMount() {
    fetch(appConst.NEWS_TEST_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(
            responseJson.articles
          ),
          isLoading: true
        });
      })
      .catch(error => {
        console.log("reset client error-------", error);
      });
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  onNewsFeedBannerClicked(rowData) {
    this.props.navigation.navigate("FeedView", {
      author: rowData.author,
      title: rowData.title,
      description: rowData.description,
      url: rowData.url,
      urlToImage: rowData.urlToImage,
      publishedAt: rowData.publishedAt
    });
  }
  onBookmarksListClicked() {
    this.props.navigation.navigate("Bookmarks", {
      title: "Bookmarks"
    });
  }
  onSearchClicked() {
    this.props.navigation.navigate("SearchNews", {
      title: "Search"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator()}
          >
            <View>
              <PagerItem
                name="Tech"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>
            <View>
              <PagerItem
                name="Sports"
                url="https://i.amz.mshcdn.com/QmY_VRk40y1QTiLJ24VFHHSJAaM=/1200x630/2018%2F10%2F04%2F8a%2F7ec72af7b5df413b9c9671f791017097.ca516.jpg"
              />
            </View>

            <View>
              <PagerItem
                name="Tech"
                url="https://i.amz.mshcdn.com/HJCeyphv-e4ID3xiRPXcqQQxPyU=/1200x630/2018%2F10%2F09%2Ff0%2F03254e2386a54cf6b7e224e0e6dd13dd.dbe5f.jpg"
              />
            </View>
          </IndicatorViewPager>

          <View
            style={{
              justifyContent: "flex-end",
              width: screenWidth,
              flexDirection: "row",
              padding: 15,
              right: 0,
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            }}
          >
            <TouchableHighlight onPress={() => this.onBookmarksListClicked()}>
              <Image
                source={require("../images/ic_bookmark_list.png")}
                style={{ width: 25, height: 25, marginRight: 15 }}
              />
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.onSearchClicked()}>
              <Image
                source={require("../images/ic_search.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={{ padding: 10, fontWeight: "bold" }}>Top Headlines</Text>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View style={styles.listitem}>
                <TouchableHighlight
                  onPress={() => this.onNewsFeedBannerClicked(rowData)}
                >
                  <View style={styles.feedItem}>
                    <View style={{ flexDirection: "column", flex: 0.7 }}>
                      <Text style={styles.authorName}>{rowData.author}</Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          paddingRight: 5,
                          paddingLeft: 5,
                          color: "#41676d",
                          fontSize: 16
                        }}
                      >
                        {rowData.title}
                      </Text>
                      <Text style={styles.publishedAt}>
                        {rowData.publishedAt}
                      </Text>
                    </View>
                    <Image
                      source={{ uri: rowData.urlToImage }}
                      style={{
                        flex: 0.3,
                        padding: 10,
                        width: 100,
                        height: 100
                      }}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  headerContainer: {
    flex: 0.4
  },
  logo: {
    flex: 1,
    width: screenWidth
  },
  headerItem: {
    flex: 1,
    backgroundColor: "#56bf77",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    flex: 0.6,
    flexDirection: "column",
    backgroundColor: "#f0f4f5"
  },

  headerLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain"
  },
  navLogo: {
    margin: 10,
    width: 25,
    height: 25
  },
  buttonLogin: {
    textAlign: "center",
    padding: 10,
    margin: 5,
    color: "#ffffff",
    backgroundColor: "#0077cc",
    alignSelf: "stretch"
  },
  buttonRegister: {
    textAlign: "center",
    padding: 10,
    margin: 5,
    color: "#0077cc",
    backgroundColor: "#ffffff",
    alignSelf: "stretch"
  },
  navToRegiser: {
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  containerOne: {
    flex: 1,
    backgroundColor: "#56bf77",
    justifyContent: "center",
    alignItems: "center"
  },
  containerTwo: {
    flex: 1,
    backgroundColor: "#3266df",
    justifyContent: "center",
    alignItems: "center"
  },
  containerThree: {
    flex: 1,
    backgroundColor: "#df6b74",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold"
  },
  description: { color: "#ffffff", fontSize: 14, padding: 5 },
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
  publishedAt: {
    padding: 12,
    color: "#19cbea",
    fontSize: 10
  }
});
