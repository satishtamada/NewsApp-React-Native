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
import FeedItem from "../../src/components/FeedItem";

const screenWidth = Dimensions.get("window").width;

export default class HomeScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      responseStatus: 0,
      newFeedList: [],

      businessBanner: appConst.BANNER_URL,
      businessDescription: "Loading ..",

      entertainmentBanner: appConst.BANNER_URL,
      entertainmentDescription: "Loading ..",

      genaralBanner: appConst.BANNER_URL,
      genaralDescription: "Loading ..",

      healthBanner: appConst.BANNER_URL,
      healthDescription: "Loading ..",

      sportsBanner: appConst.BANNER_URL,
      sportsDescription: "Loading ..",

      scienceBanner: appConst.BANNER_URL,
      scienceDescription: "Loading ..",

      techBanner: appConst.BANNER_URL,
      techDescription: "Loading .."
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
    this.getBusinessNewsData();
    this.getGenaralData();
    this.getEntertainmentData();
    this.getSportsNewsData();
    this.getHealthNewsData();
    this.getScienceNewsData();
    this.getTechNewsData();
  }

  getSportsNewsData() {
    fetch(appConst.NEWS_SPORTS)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          sportsBanner: responseJson.articles[0].urlToImage,
          sportsDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }

  getSportsNewsData() {
    fetch(appConst.NEWS_SPORTS)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          sportsBanner: responseJson.articles[0].urlToImage,
          sportsDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }
  getHealthNewsData() {
    fetch(appConst.NEWS_HEALTH)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          healthBanner: responseJson.articles[0].urlToImage,
          healthDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }
  getScienceNewsData() {
    fetch(appConst.NEWS_SCIENCE)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          scienceBanner: responseJson.articles[0].urlToImage,
          scienceDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }
  getTechNewsData() {
    fetch(appConst.NEWS_TECHNOLOGY)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          techBanner: responseJson.articles[0].urlToImage,
          techDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }

  getGenaralData() {
    fetch(appConst.NEWS_GENERAL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          genaralBanner: responseJson.articles[0].urlToImage,
          genaralDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }

  getEntertainmentData() {
    fetch(appConst.NEWS_ENTERTINMENT)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          entertainmentBanner: responseJson.articles[0].urlToImage,
          entertainmentDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
  }

  getBusinessNewsData() {
    fetch(appConst.NEWS_BUSINESS)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          businessBanner: responseJson.articles[0].urlToImage,
          businessDescription: responseJson.articles[0].description
        });
      })
      .catch(error => { });
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
                  {/* <View style={styles.feedItem}>
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
                      source={{ uri: item.urlToImage}}
                      style={{
                        flex: 0.3,
                        padding: 10,
                        width: 100,
                        height: 100,
                        backgroundColor: "#c4c4c4"
                      }}
                    />
                  </View> */}
                  <FeedItem
                    author={item.author}
                    title={item.title}
                    publishedAt={item.publishedAt}
                    url={item.urlToImage} />
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
                description={this.state.businessDescription}
                url={this.state.businessBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Entertainment"
                category="entertainment"
                description={this.state.entertainmentDescription}
                url={this.state.entertainmentBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="General"
                category="general"
                description={this.state.genaralDescription}
                url={this.state.genaralBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Health"
                category="health"
                description={this.state.healthDescription}
                url={this.state.healthBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Science"
                category="science"
                description={this.state.scienceDescription}
                url={this.state.scienceBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Sports"
                category="sports"
                description={this.state.sportsDescription}
                url={this.state.sportsBanner}
              />
            </View>

            <View>
              <PagerItem
                navigation={navigation}
                name="Technology"
                category="technology"
                description={this.state.techDescription}
                url={this.state.techBanner}
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
