import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";

import { auth, db } from "../../../Service/FirebaseConfig";
const Profile = (props) => {
  console.log("RENDERING Profile");
  console.log(auth.currentUser.photoURL);
  useEffect(() => {
    return () => console.log("CLEANUP Profile");
  }, []);
  // const [Timeline, setTimeline] = useState([]);
  // useEffect(() => {
  //   db.ref("rooms/" + JoinId + "/roompics")
  //     .once("value")
  //     .then((snap) => setTimeline(snap.val()));
  // }, []);
  // console.log(Timeline);
  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {!auth.currentUser.photoURL ? (
          <Text>No Profile Pic</Text>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: auth.currentUser.photoURL }}
          />
        )}
      </View>
      <Text>UserName : {auth.currentUser.displayName}</Text>
      <Button
        onPress={() => props.navigation.navigate("EditProfile")}
        title="Edit Profile"
      />
      <Text>TIME LINE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
