import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { logout } from "../../../Redux/Actions/AuthActions";
import { useDispatch } from "react-redux";
import { auth, db, storage } from "../../../Service/FirebaseConfig";
const Profile = (props) => {
  console.log("RENDERING Profile");
  // console.log(auth.currentUser.photoURL);
  const dispatch = useDispatch();

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
  const handle = async () => {
    const resForDummyIMage = await fetch(
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FImage&psig=AOvVaw2NQYwJraEh-WPdi9C4lBZj&ust=1624640297113000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLj-s_LesPECFQAAAAAdAAAAABAD"
    );
    const blob = await resForDummyIMage.blob();

    var reference = storage
      .ref()
      .child("users/" + auth.currentUser.uid + "/ProfilePic");

    await reference.put(blog).then(console.log("Dummy prof pic uploaded"));
  };
  return (
    <View style={styles.container}>
      <Button onPress={handle} title={"press me "} />
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
      <Button title="Signout" onPress={() => dispatch(logout())} />
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
