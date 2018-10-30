import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

const screenWidht = Dimensions.get("window").width;

var bookmarkUrl = "";
export default class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkUrl: require("../images/ic_bookmark_unselect.png"),
      loadingImage: false
    };
  }

  onFindMoreDetailsClicked(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  async onBookmarkClicked(url) {
    try {
      const bookmarksString = JSON.stringify(url);
      alert(bookmarksString);

      await AsyncStorage.setItem("@MyStore:bookmarks", bookmarksString);
      this.setState({
        bookmarkUrl: require("../images/ic_bookmark_selected.png")
      });
    } catch (error) {
      // Error saving data
    }
  }

  onImageLoaded(url) {
    this.setState({
      bannerUrl: { uri: url }
    });
  }

  onImageError() {
    this.setState({
      bookmarkUrl: require("../images/ic_bookmark_selected.png")
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    var imagePath;
    if (params.urlToImage == null) {
      imagePath = require("../images/ic_image_placeholder.jpg");
    } else {
      imagePath = {
        uri: params.urlToImage
      };
    }
    return (
      <View style={styles.container}>
        <Image source={imagePath} style={styles.image} />

        <View style={styles.bodyContainer}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.authorName}>{params.author}</Text>
            <TouchableOpacity
              onPress={() => this.onBookmarkClicked(params.url)}
            >
              <Image
                source={this.state.bookmarkUrl}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.publishedAt}>{params.publishedAt}</Text>

          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.description}>{params.description}</Text>

          <View />
        </View>
        <View style={styles.fooetrConatiner}>
          <TouchableOpacity
            onPress={() => this.onFindMoreDetailsClicked(params.url)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Image
              source={require("../images/ic_more.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.findMoreDetails}>Find more details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 0.4,
    width: screenWidht
  },
  bodyContainer: {
    padding: 10,
    flex: 0.5,
    flexDirection: "column"
  },
  fooetrConatiner: {
    marginLeft: 20,
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center"
  },
  authorName: {
    flex: 1,
    width: "100%",
    padding: 12,
    color: "#90a4a8",
    fontSize: 14
  },
  title: {
    padding: 12,
    color: "#41676d",
    fontSize: 16,
    fontWeight: "bold"
  },
  publishedAt: {
    paddingRight: 12,
    paddingLeft: 12,
    color: "#19cbea",
    fontSize: 12
  },
  description: {
    padding: 12,
    color: "#41676d",
    fontSize: 18,
    flexWrap: "wrap"
  },
  findMoreDetails: {
    color: "#1877BA",
    fontWeight: "bold",
    padding: 10,
    fontSize: 15
  }
});
