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
    return <PagerDotIndicator pageCount={2} />;
  }

  onNewsFeedBannerClicked(value) {
    this.props.navigation.navigate("NewsFeed", {
      title: value
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
            <View style={styles.headerItem}>
              <TouchableOpacity
                onPress={() => this.onNewsFeedBannerClicked("sports")}
              >
                <Image
                  style={styles.logo}
                  source={{
                    uri:
                      "https://techcrunch.com/wp-content/uploads/2018/03/gettyimages-917474100.jpg?w=600"
                  }}
                />
                <View
                  style={{
                    width: screenWidth,
                    flex: 1,
                    flexDirection: "column",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    position: "absolute",
                    bottom: 0,
                    paddingBottom: 30
                  }}
                >
                  <Text
                    style={{
                      padding: 10,
                      color: "#ffffff",
                      fontSize: 18,
                      fontWeight: "bold"
                    }}
                  >
                    Sports
                  </Text>
                  <Text
                    style={{
                      paddingRight: 10,
                      paddingBottom: 10,
                      paddingLeft: 10,
                      color: "#ffffff"
                    }}
                  >
                    This is hwta i needed to get a touchable working.{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.containerThree}>
              <Image
                style={styles.logo}
                source={require("../images/ic_android.png")}
              />
            </View>
          </IndicatorViewPager>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={{ padding: 10,fontWeight:'bold'}}>Top Headlines</Text>
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <View style={styles.listitem}>
                <TouchableHighlight>
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
