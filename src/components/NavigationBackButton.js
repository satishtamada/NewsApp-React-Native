import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";

export default class NavigationBackButton extends Component {
  constructor(props) {
    super(props);
  }

  onBackPressed() {
    alert("here");
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onBackPressed()}
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginLeft: 10
              }}
              source={require("../images/ic_back_arrow.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
