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
} from "react-native-elements";
// import { auth, db } from "../../Service/FirebaseConfig";

const Profile = (props) => {
  console.log("RENDERING FrinedProfile");
  useEffect(() => {
    return () => console.log("CLEANUP FriendProfile");
  }, []);
  //   console.log(props.route.params.params);
  const frnduid = props.route.params.params.friendkey;
  const friendUserName = props.route.params.params.friendUserName;
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
        {false ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              icon={<Icon name="arrow-right" size={15} color="white" />}
              containerStyle={{ width: "93%", marginTop: 20 }}
              title="Add Friend"
              // onPress={() => giveFrndReq(aUser[0])}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "center",
              width: "100%",
            }}
          >
            <Button
              containerStyle={{ width: "80%", marginTop: 20 }}
              title="Add Friend"
            />
            <Button
              containerStyle={{ width: "10%", marginTop: 20 }}
              title="v"
            />
          </View>
        )}

        <View style={{ backgroundColor: "pink", marginTop: 20, width: "100%" }}>
          {false ? (
            <View style={{justifyContent: "center", alignItems: "center", height: 400}}>
              <Icon name="camera" type="font-awesome" size={40}></Icon>
              <Text h2>No Posts Yet</Text>
            </View>
          ) :             
          <View style={{justifyContent: "center", alignItems: "center", height: 400}}>
          <Icon name="camera" type="font-awesome" size={40}></Icon>
          <Text h2>No Posts Yet</Text>
        </View>}
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
