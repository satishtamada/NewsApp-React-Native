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

export default class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkUrl: require("../images/ic_bookmark_unselect.png"),
      loadingImage: false,
      bookmarksList: []
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.getBookmarksList();
      }.bind(this),
      200
    );
  }

  //get the bookmarks list from the storage
  async getBookmarksList() {
    try {
      const bookmarksString = await AsyncStorage.getItem("@MyStore:bookmarks");
      if (bookmarksString !== null) {
        // set the bookmarks list
        this.setState({
          bookmarksList: JSON.parse(bookmarksString)
        });
      }
    } catch (error) {
      // Error retrieving data
      alert(error);
    }
  }

  onFindMoreDetailsClicked(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  async onBookmarkClicked(urlToImage, author, url, title, description) {
    var index = this.state.bookmarksList.length;
    this.state.bookmarksList.push({
      url: url,
      title: title,
      image: urlToImage,
      desc: description,
      author: author,
      position: index
    });
    try {
      const bookmarksString = JSON.stringify(this.state.bookmarksList);
      await AsyncStorage.setItem("@MyStore:bookmarks", bookmarksString);
      this.setState({
        bookmarkUrl: require("../images/ic_bookmark_selected.png")
      });
    } catch (error) {
      alert("unable to add bookmark");
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
              onPress={() =>
                this.onBookmarkClicked(
                  params.urlToImage,
                  params.author,
                  params.url,
                  params.title,
                  params.description
                )
              }
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
