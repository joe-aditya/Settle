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

const Profile = (props) => {
  console.log("RENDERING FrinedProfile");

  const uid = useSelector((state) => state.Auth.userId);
  const frnduid = props.route.params.params.friendkey;
  const friendUserName = props.route.params.params.friendUserName;
  const frndlist = useSelector((state) => state.Home.friends);

  const [snapstatus, setSnapstatus] = useState(false);
  const [friendstatus, setFriendstatus] = useState("not a friend");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    db.ref("users/" + frnduid + "/friendReq/" + uid)
      .once("value")
      .then((snap) => {
        setSnapstatus(snap.val());
        console.log("snapVal = " + snap.val());
      });
    frndlist.forEach((item) => {
      if (item[0] == frnduid) setFriendstatus("friend");
    });
    return () => console.log("CLEANUP FriendProfile");
  }, []);

  console.log("snapStatus = " + snapstatus);
  //console.log(props.route.params.params);
  //console.log(frndlist);

  const posts = [
    {
      id: 0,
      uname: "RED (Taylor's Version)",
      date: "Nov 19, 2021",
      url: "https://pressroom.umgnashville.com/wp-content/uploads/2021/06/E4LtA9ZXwAsgl1V-1.jpg",
    },
    {
      id: 1,
      uname: "FEARLESS (Taylor's Version)",
      date: "Apr 09, 2021",
      url: "https://thedailyaztec.com/wp-content/uploads/2021/04/image-900x900.jpeg",
    },
    {
      id: 2,
      uname: "evermore",
      date: "Dec 11, 2020",
      url: "https://media.newyorker.com/photos/5fd79b014a2e0a2853da7625/2:2/w_1536,h_1536,c_limit/Petrusich-TaylorSwift.jpg",
    },
    {
      id: 3,
      uname: "folklore",
      date: "Jul 24, 2020",
      url: "https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png",
    },
    {
      id: 4,
      uname: "Lover",
      date: "Aug 23, 2019",
      url: "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=2000&h=2000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2019%2F10%2Ftaylor-swift-lover-2000.jpg",
    },
    {
      id: 5,
      uname: "reputation",
      date: "Nov 10, 2017",
      url: "https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png",
    },
    {
      id: 6,
      uname: "1989",
      date: "Oct 27, 2014",
      url: "https://lastfm.freetls.fastly.net/i/u/ar0/574db9d1528b064ca2faaf557f564bda.jpg",
    },
    {
      id: 7,
      uname: "RED",
      date: "Oct 22, 2012",
      url: "https://static.wikia.nocookie.net/taylor-swift/images/d/d5/Red_Deluxe_edition.jpg/revision/latest?cb=20170905004459",
    },
    {
      id: 8,
      uname: "Speak Now",
      date: "Oct 25, 2010",
      url: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Taylor_Swift_-_Speak_Now_cover.png/220px-Taylor_Swift_-_Speak_Now_cover.png",
    },
    {
      id: 9,
      uname: "FEARLESS",
      date: "Nov 11, 2008",
      url: "https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png",
    },
    {
      id: 10,
      uname: "Taylor Swift",
      date: "Oct 24, 2006",
      url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Taylor_Swift_-_Taylor_Swift.png/220px-Taylor_Swift_-_Taylor_Swift.png",
    }
  ];

  const renderPostInGridView = ({ item }) => (
    <View
      style={{
        borderColor: "pink",
        borderWidth: 2,
      }}
    >
      <Image style={{ width: 127, height: 127 }} source={{ uri: item.url }} />
    </View>
  );

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
            uri: item.url,
          }}
          size={50}
        />
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontSize: 20 }}>{item.uname}</Text>
          <Text style={{ fontSize: 16 }}>{item.date}</Text>
        </View>
      </View>
      <Image style={{ width: 400, height: 400 }} source={{ uri: item.url }} />
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
                props.navigation.navigate("Search");
              }}
            />
            <Text style={styles.uname}>{friendUserName}</Text>
          </View>
        }
      />
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            source={{
              uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
            }}
            containerStyle={{
              marginLeft: 20,
              marginTop: 20,
            }}
            rounded
            size={120}
          />
          <View
            style={{
              flexDirection: "row",
              height: 120,
              flex: 1,
              marginTop: 20,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 25 }}>{posts.length}</Text>
              <Text style={{ fontSize: 20 }}>Posts</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 25 }}>143</Text>
              <Text style={{ fontSize: 20 }}>Friends</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: "pink", marginTop: 10, width: "100%" }}>
          <Text>bio n stuff comes here</Text>
        </View>

        <View>
          {friendstatus == "friend" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "space-between",
              }}
            >
              <Button
                containerStyle={{ width: "80%", marginTop: 20 }}
                title="Following"
                type="outline"
                disabled
                disabledStyle={{ borderColor: "green" }}
                disabledTitleStyle={{ color: "green" }}
              />
              <View
                style={{
                  width: "10%",
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#24a0ed",
                  borderRadius: 5,
                  borderWidth: 0.5,
                }}
              >
                <Tooltip
                  popover={
                    <Button
                      containerStyle={{
                        width: "100%",
                      }}
                      buttonStyle={{ backgroundColor: "#24a0ed" }}
                      title="Unfriend"
                      onPress={() => {
                        setFriendstatus("not a friend");
                        setSnapstatus(null);
                      }}
                    />
                  }
                  containerStyle={{ height: 50, backgroundColor: "#24a0ed" }}
                >
                  <Icon
                    name="caret-down"
                    type="font-awesome"
                    size={40}
                    color="#24a0ed"
                  />
                </Tooltip>
              </View>
            </View>
          ) : snapstatus != null ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignContent: "center",
                width: "100%",
              }}
            >
              <Button
                containerStyle={{ width: "93%", marginTop: 20 }}
                title="Requested"
                disabled
                raised
              />
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  containerStyle={{ width: "93%", marginTop: 20 }}
                  title="Add Friend"
                  onPress={() => {
                    giveFrndReq(frnduid);
                    setSnapstatus(true);
                  }}
                />
              </View>
            </View>
          )}
        </View>

        <View style={{ backgroundColor: "pink", marginTop: 20, width: "100%" }}>
          {false ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 400,
              }}
            >
              <Icon name="camera" type="font-awesome" size={40}></Icon>
              <Text h2>No Posts Yet</Text>
            </View>
          ) : (
            <>
              <Tab value={index} onChange={setIndex}>
                <Tab.Item title="Grid" />
                <Tab.Item title="Scroll" />
              </Tab>

              <TabView value={index} onChange={setIndex}>
                <TabView.Item style={{ width: "100%" }}>
                  <View
                    style={{
                      
                    }}
                  >
                    <FlatList
                      data={posts}
                      renderItem={renderPostInGridView}
                      keyExtractor={(item) => item.id}
                      numColumns={3}
                    />
                  </View>
                </TabView.Item>

                <TabView.Item style={{ width: "100%" }}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FlatList
                      data={posts}
                      renderItem={renderPostInScrollView}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </TabView.Item>
              </TabView>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  uname: {
    color: "#fff",
    marginLeft: 18,
    fontSize: 18,
  },
});

export default Profile;
