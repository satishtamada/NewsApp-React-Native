import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
const screenWidth = Dimensions.get("window").width;
import * as appConst from "../../src/config/Config";

export default class PagerItem extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      newsFeedHealth: []
    };
  }

  // async componentWillMount() {
  //   fetch(appConst.NEWS_TEST_URL)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       this.setState({
  //         newsFeedHealth: responseJson.articles,
  //         newsDesc:responseJson.articles[0].title
  //       });
  //       alert(this.state.newsFeedHealth[0].title+" hello ram");
  //     })
  //     .catch(error => {
  //       alert(error);
  //     });
  // }

  onNewsFeedBannerClicked(title, category) {
    this.props.navigation.navigate("NewsFeed", {
      title: title,
      category: category
    });
  }

  render() {
    var imageurl =
      "https://raw.githubusercontent.com/satishtamada/NewsApp-React-Native/master/screensshots/ic_news_placeholder.jpg";
    if (this.props.url != null) {
      imageurl = this.props.url;
    }
    var description = "Loading..";
    if (this.props.description != null) {
      description = this.props.description;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.onNewsFeedBannerClicked(this.props.name, this.props.category)
          }
        >
          <Image style={styles.logo} source={{ uri: imageurl }} />

          <View style={styles.footerContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              top: 0,
              left: 0,
              position: "absolute"
            }}
          >
            <Image
              source={require("../images/ic_news.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#56bf77",
    justifyContent: "center",
    alignItems: "center"
  },
  footerContainer: {
    width: screenWidth,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0, 0, 200, 0.3)",
    position: "absolute",
    bottom: 0,
    paddingBottom: 30
  },
  logo: {
    flex: 1,
    width: screenWidth
  },
  title: {
    padding: 10,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  },
  description: {
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: "#ffffff"
  }
});
