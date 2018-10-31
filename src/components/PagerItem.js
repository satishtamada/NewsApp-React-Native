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
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      newsDesc: "Description"
    };
  }

  onNewsFeedBannerClicked(title, category) {
    this.props.navigation.navigate("NewsFeed", {
      title: title,
      category: category
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.onNewsFeedBannerClicked(this.props.name, this.props.category)
          }
        >
          <Image
            style={styles.logo}
            source={{
              uri: this.props.url
            }}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.description}>{this.state.newsDesc}</Text>
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
