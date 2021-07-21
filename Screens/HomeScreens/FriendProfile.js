import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
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
} from "react-native-elements";
import { auth, db } from "../../Service/FirebaseConfig";
// import { auth, db } from "../../Service/FirebaseConfig";

const Profile = (props) => {
  console.log("RENDERING FrinedProfile");

  const uid = useSelector((state) => state.Auth.userId);
  const frnduid = props.route.params.params.friendkey;
  const friendUserName = props.route.params.params.friendUserName;
  const frndlist = useSelector((state) => state.Home.friends);

  const [snapstatus, setSnapstatus] = useState(false);
  const [friendstatus, setFriendstatus] = useState("not a friend");

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
  //   console.log(props.route.params.params);
  //console.log(frndlist);

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
              <Text style={{ fontSize: 25 }}>143</Text>
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
                {/* <Button
                containerStyle={{ width: "10%", marginTop: 20 }}
                title="v"
              /> */}
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
