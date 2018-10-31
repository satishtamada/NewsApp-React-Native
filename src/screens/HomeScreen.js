import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import * as appConst from "../../src/config/Config";
import PagerItem from "../../src/components/PagerItem";

const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      responseStatus: 0,
      newFeedList: []
    };
  }

  async componentWillMount() {
    fetch(appConst.NEWS_TEST_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          newFeedList: responseJson.articles,
          isLoading: true,
          responseStatus: 1
        });
      })
      .catch(error => {
        this.setState({
          responseStatus: 2
        });
      });
  }

  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={7} />;
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

  onChannelsClicked() {
    this.props.navigation.navigate("ChannelsList", {
      title: "Channels"
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
    const { navigation } = this.props;
    var newsFeed;
    if (this.state.responseStatus === 0) {
      newsFeed = (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.responseStatus === 1) {
      newsFeed = (
        <View>
          <FlatList
            style={{ flex: 1, width: screenWidth }}
            enableEmptySections={true}
            data={this.state.newFeedList}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity
                  onPress={() => this.onNewsFeedBannerClicked(item)}
                >
                  <View style={styles.feedItem}>
                    <View style={{ flexDirection: "column", flex: 0.7 }}>
                      <Text style={styles.authorName}>{item.author}</Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          paddingRight: 5,
                          paddingLeft: 5,
                          color: "#41676d",
                          fontSize: 16
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text style={styles.publishedAt}>{item.publishedAt}</Text>
                    </View>
                    <Image
                      defaultSource={require("../images/ic_news.png")}
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
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      newsFeed = (
        <View>
          <Text>It's seems you don't have internet connection..!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator()}
          >
            {/* business entertainment general health science sports technology */}
            <View>
              <PagerItem
                navigation={navigation}
                name="Business"
                category="business"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Entertainment"
                category="entertainment"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="General"
                category="general"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Health"
                category="health"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Science"
                category="science"
                url="https://i.kinja-img.com/gawker-media/image/upload/s--PNvLT0lH--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/nohdjhahrp47nwogocku.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Sports"
                category="sports"
                url="https://i.amz.mshcdn.com/QmY_VRk40y1QTiLJ24VFHHSJAaM=/1200x630/2018%2F10%2F04%2F8a%2F7ec72af7b5df413b9c9671f791017097.ca516.jpg"
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Technology"
                category="technology"
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
              position: "absolute"
            }}
          >
            <TouchableHighlight onPress={() => this.onChannelsClicked()}>
              <Image
                source={require("../images/ic_news_channels.png")}
                style={{ width: 25, height: 25, marginRight: 15 }}
              />
            </TouchableHighlight>

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
          {newsFeed}
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
    alignItems: "center",
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
