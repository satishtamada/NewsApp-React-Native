import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator
} from "react-native";
import NavigationBackButton from "../../src/components/NavigationBackButton";
import * as appConst from "../../src/config/Config";

const screen_width = Dimensions.get("window").width;
export default class ChannelsList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <NavigationBackButton navigation={navigation} />,
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

  constructor() {
    super();
    this.state = {
      isChannelListAvaliable: 1,
      channelsData: []
    };
  }

  async componentWillMount() {
    fetch(appConst.NEWS_CHANNELS_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          channelsData: responseJson.sources,
          isChannelListAvaliable: 2
        });
      })
      .catch(error => {
        this.setState({
          isChannelListAvaliable: 0
        });
      });
  }

  onChannelItemClicked(url) {
    this.props.navigation.navigate("NewsWebView", {
      url: url
    });
  }

  render() {
    var channelsList;
    if (this.state.isChannelListAvaliable == 2) {
      channelsList = (
        <View style={styles.container}>
          {/* id: "abc-news",
name: "ABC News",
description: "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
url: "https://abcnews.go.com",
category: "general",
language: "en",
country: "us" */}
          <FlatList
            style={{ flex: 1, width: screen_width }}
            data={this.state.channelsData}
            renderItem={({ item }) => (
              <View style={styles.listitem}>
                <TouchableOpacity
                  onPress={() => this.onChannelItemClicked(item.url)}
                >
                  <View style={styles.feedItem}>
                    <Image
                      source={require("../images/ic_channel_placeholder.png")}
                      style={{ width: 25, height: 25 }}
                    />
                    <Text style={{ padding: 10, fontSize: 17 }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (this.state.isChannelListAvaliable == 1) {
      channelsList = (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      channelsList = (
        <View style={styles.emptyChannelsContainer}>
          <Image
            source={require("../images/ic_empty_channel.png")}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ fontWeight: "bold", padding: 10, color: "#686868" }}>
            NO RESULTS FOUND..!
          </Text>
          <Text style={{ color: "#848080" }}>
            Unable to fetch the channels list..! Try again.
          </Text>
        </View>
      );
    }
    return <View style={styles.container}>{channelsList}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyChannelsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
});
