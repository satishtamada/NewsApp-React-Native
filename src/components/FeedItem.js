import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class FeedItem extends Component {

    render() {
        var imageurl =
            "https://raw.githubusercontent.com/satishtamada/NewsApp-React-Native/master/src/images/ic_news_placeholder.png";
        if (this.props.url != null) {
            imageurl = this.props.url;
        }
        return (<View>
            <View style={styles.feedItem}>
                <View style={{ flexDirection: "column", flex: 0.7 }}>
                    <Text style={styles.authorName}>{this.props.author}</Text>
                    <Text numberOfLines={2} style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.publishedAt}>{this.props.publishedAt}</Text>
                </View>
                <Image
                    source={{ uri: imageurl }}
                    style={{
                        flex: 0.3,
                        padding: 10,
                        width: 100,
                        height: 100,
                        backgroundColor: "#c4c4c4"
                    }}
                />
            </View>
        </View>);

    }
}

const styles = StyleSheet.create({
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
    title: {
        paddingRight: 5,
        paddingLeft: 5,
        color: "#41676d",
        fontSize: 16
    },
    publishedAt: {
        padding: 12,
        color: "#19cbea",
        fontSize: 10
    }
});
