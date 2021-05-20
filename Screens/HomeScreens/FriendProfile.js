import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import { giveFrndReq } from "../../Redux/Actions/HomeAction";
// import { auth, db } from "../../Service/FirebaseConfig";
const Profile = (props) => {
  console.log("RENDERING FrinedProfile");
  useEffect(() => {
    return ()=>console.log("CLEANUP FriendProfile");
  }, []);
  //   console.log(props.route.params.params);
  const frnduid = props.route.params.params.friendkey;
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          giveFrndReq(frnduid);
        }}
      >
        <View>
          <Text>ADD FRIEND </Text>
          <Text>{frnduid}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  container: {
    marginTop: 50,
    // marginBottom: 30,

    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 10,

    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Profile;
