import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { giveFrndReq } from "../../Redux/Actions/HomeAction";
import {
  Header,
  ListItem,
  Avatar,
  Icon,
  Text,
  SocialIcon,
  Badge,
  Button,
  Tooltip,
  Tab,
  TabView,
} from "react-native-elements";
import { auth, db } from "../../Service/FirebaseConfig";

const ProfileScrollView = (props) => {
  console.log("RENDERING ProfileScrollView");

  const possts = [
    {
      id: "0",
      uname: "RED (Taylor's Version)",
      date: "Nov 19, 2021",
      url: "https://pressroom.umgnashville.com/wp-content/uploads/2021/06/E4LtA9ZXwAsgl1V-1.jpg",
    },
    {
      id: "1",
      uname: "FEARLESS (Taylor's Version)",
      date: "Apr 09, 2021",
      url: "https://thedailyaztec.com/wp-content/uploads/2021/04/image-900x900.jpeg",
    },
    {
      id: "2",
      uname: "evermore",
      date: "Dec 11, 2020",
      url: "https://media.newyorker.com/photos/5fd79b014a2e0a2853da7625/2:2/w_1536,h_1536,c_limit/Petrusich-TaylorSwift.jpg",
    },
    {
      id: "3",
      uname: "folklore",
      date: "Jul 24, 2020",
      url: "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png",
    },
    {
      id: "4",
      uname: "Lover",
      date: "Aug 23, 2019",
      url: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=2000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2019%2F10%2Ftaylor-swift-lover-2000.jpg",
    },
    {
      id: "5",
      uname: "reputation",
      date: "Nov 10, 2017",
      url: "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png",
    },
    {
      id: "6",
      uname: "1989",
      date: "Oct 27, 2014",
      url: "https://lastfm.freetls.fastly.net/i/u/ar0/574db9d1528b064ca2faaf557f564bda.jpg",
    },
    {
      id: "7",
      uname: "RED",
      date: "Oct 22, 2012",
      url: "https://static.wikia.nocookie.net/taylor-swift/images/d/d5/Red_Deluxe_edition.jpg/revision/latest?cb=20170905004459",
    },
    {
      id: "8",
      uname: "Speak Now",
      date: "Oct 25, 2010",
      url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Taylor_Swift_-_Speak_Now_cover.png/220px-Taylor_Swift_-_Speak_Now_cover.png",
    },
    {
      id: "9",
      uname: "FEARLESS",
      date: "Nov 11, 2008",
      url: "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png",
    },
    {
      id: "10",
      uname: "Taylor Swift",
      date: "Oct 24, 2006",
      url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Taylor_Swift_-_Taylor_Swift.png/220px-Taylor_Swift_-_Taylor_Swift.png",
    },
  ];

  const posts = [
    {
      id: 0,
      uname: "RED (Taylor's Version)",
      date: "Nov 19, 2021",
      url: [
        "https://pressroom.umgnashville.com/wp-content/uploads/2021/06/E4LtA9ZXwAsgl1V-1.jpg",
      ],
    },
    {
      id: 1,
      uname: "FEARLESS (Taylor's Version)",
      date: "Apr 09, 2021",
      url: [
        "https://thedailyaztec.com/wp-content/uploads/2021/04/image-900x900.jpeg",
      ],
    },
    {
      id: 2,
      uname: "evermore",
      date: "Dec 11, 2020",
      url: [
        "https://media.newyorker.com/photos/5fd79b014a2e0a2853da7625/2:2/w_1536,h_1536,c_limit/Petrusich-TaylorSwift.jpg",
      ],
    },
    {
      id: 3,
      uname: "folklore",
      date: "Jul 24, 2020",
      url: [
        "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png",
      ],
    },
    {
      id: 4,
      uname: "Lover",
      date: "Aug 23, 2019",
      url: [
        "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=2000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2019%2F10%2Ftaylor-swift-lover-2000.jpg",
      ],
    },
    {
      id: 5,
      uname: "reputation",
      date: "Nov 10, 2017",
      url: [
        "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png",
        "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png",
        "https://lastfm.freetls.fastly.net/i/u/ar0/574db9d1528b064ca2faaf557f564bda.jpg",
      ],
    },
    {
      id: 6,
      uname: "1989",
      date: "Oct 27, 2014",
      url: [
        "https://lastfm.freetls.fastly.net/i/u/ar0/574db9d1528b064ca2faaf557f564bda.jpg",
      ],
    },
    {
      id: 7,
      uname: "RED",
      date: "Oct 22, 2012",
      url: [
        "https://static.wikia.nocookie.net/taylor-swift/images/d/d5/Red_Deluxe_edition.jpg/revision/latest?cb=20170905004459",
      ],
    },
    {
      id: 8,
      uname: "Speak Now",
      date: "Oct 25, 2010",
      url: [
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Taylor_Swift_-_Speak_Now_cover.png/220px-Taylor_Swift_-_Speak_Now_cover.png",
      ],
    },
    {
      id: 9,
      uname: "FEARLESS",
      date: "Nov 11, 2008",
      url: [
        "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png",
      ],
    },
    {
      id: 10,
      uname: "Taylor Swift",
      date: "Oct 24, 2006",
      url: [
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Taylor_Swift_-_Taylor_Swift.png/220px-Taylor_Swift_-_Taylor_Swift.png",
      ],
    },
  ];

  const renderPostInScrollView = ({ item }) => (
    <View style={{ marginBottom: 10, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          height: 60,
          backgroundColor: "white",
          paddingLeft: 10,
        }}
      >
        <Avatar
          rounded
          source={{
            uri: item.url[0],
          }}
          size={50}
        />
        <View style={{ paddingLeft: 10, flex: 4.5 }}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={{ fontSize: 20 }}>
            {item.uname}
          </Text>
          <Text style={{ fontSize: 16 }}>{item.date}</Text>
        </View>
        {/* {item.url.length != 1 ? ( */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "flex-end",
            paddingRight: 20,
          }}
        >
          <View
            style={{
              height: 35,
              width: 55,
              backgroundColor: "#24a0ed",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 50,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <Text h4>{item.url.length}</Text>
          </View>
        </View>
        {/* ) : null} */}
      </View>
      {item.url.length == 1 ? (
        <Image
          style={{ width: 400, height: 400 }}
          source={{ uri: item.url[0] }}
        />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator>
          {item.url.map((url, index) => (
            <Image
              style={{ width: 400, height: 400 }}
              source={{ uri: url }}
              key={index}
            />
          ))}
        </ScrollView>
      )}
      <Text>caption n stuff goes here</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Header
        leftComponent={
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="arrow-left"
              type="font-awesome"
              color="#fff"
              onPress={() => {
                props.navigation.navigate("FriendProfile");
              }}
            />
            <Text style={styles.uname}>Posts</Text>
          </View>
        }
      />
      <FlatList
        data={posts}
        renderItem={renderPostInScrollView}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uname: {
    color: "#fff",
    marginLeft: 18,
    fontSize: 18,
  },
});

export default ProfileScrollView;
