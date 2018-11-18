import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  AppRegistry,
  Platform,
  StyleSheet
} from "react-native";
import { createStackNavigator } from "react-navigation";
import NewsFeed from "../screens/NewsFeed";
import FeedView from "../screens/FeedView";
import NewsWebView from "../screens/NewsWebView";
import HomeScreen from "../screens/HomeScreen";
import Bookmarks from "../screens/Bookmarks";
import SearchNews from "../screens/SearchNews";
import ChannelsList from "../screens/ChannelsList";
import ChannelNewsFeed from "../screens/ChannelNewsFeed";

const AppStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  NewsFeed: {
    screen: NewsFeed
  },
  ChannelsList: {
    screen: ChannelsList
  },
  ChannelNewsFeed: {
    screen: ChannelNewsFeed
  },
  Bookmarks: {
    screen: Bookmarks
  },
  SearchNews: {
    screen: SearchNews
  },
  FeedView: {
    screen: FeedView,
    navigationOptions: {
      header: null
    }
  },
  NewsWebView: {
    screen: NewsWebView,
    navigationOptions: {
      header: null
    }
  }
});

class BlinkText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true
    };
  }

  async componentWillMount() {
    setInterval(() => {
      this.isShowing = !this.state.isShowing;
    }, 1000);
  }

  render() {
    if (this.state.isShowing) {
      return (
        <View>
          <Text style={{ color: "#ffce5c", fontWeight: "bold" }}>
            {this.props.value}
          </Text>
        </View>
      );
    } else {
      return <Text />;
    }
  }
}

class Logo extends Component {
  render() {
    return (
      <View>
        <Image
          source={this.props.url}
          style={{ width: 30, height: 30, padding: 5 }}
        />
      </View>
    );
  }
}

export default class SpalshScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ isLoading: true });
      }.bind(this),
      500
    );
  }

  render() {
    let pic = "";
    let osName = "";
    if (Platform.OS === "ios") {
      pic = require("../images/ic_ios.png");
      osName = "ios";
    }
    if (Platform.OS === "android") {
      pic = require("../images/ic_android.png");
      osName = "Android";
    }
    if (this.state.isLoading) {
      return <AppStackNavigator />;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.bodyContainer}>
            <Image
              source={require("../images/ic_news.png")}
              style={styles.logo}
            />
            <Text style={styles.title}> News App - React</Text>
          </View>

          <View style={styles.footer}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Logo url={pic} />
              <Text style={{ padding: 5 }}>
                App is developed in React Native
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Text>React-Native </Text>
              <BlinkText value={osName} />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0050ff",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    marginBottom: 100,
    flexDirection: "column",
    alignItems: "center"
  },
  logo: {
    width: 100,
    height: 100,
    padding: 20
  },
  title: {
    fontSize: 20,
    padding: 10,
    color: "#ffffff",
    fontWeight: "bold"
  },
  footer: {
    padding: 20,
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: 0
  }
});
