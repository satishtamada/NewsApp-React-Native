import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const screenWidht = Dimensions.get("window").width;
export default class FeedView extends Component {
  constructor(props) {
    super(props);
  }

  onFindMoreDetailsClicked(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image source={{ uri: params.urlToImage }} style={styles.image} />

        <View style={styles.bodyContainer}>
          <Text style={styles.authorName}>{params.author}</Text>
          <Text style={styles.publishedAt}>{params.publishedAt}</Text>

          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.description}>{params.description}</Text>

          <View />
        </View>
        <View style={styles.fooetrConatiner}>
          <TouchableOpacity
            onPress={ () => this.onFindMoreDetailsClicked(params.url)}
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
