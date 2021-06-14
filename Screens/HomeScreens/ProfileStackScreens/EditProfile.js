import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button, TextInput } from "react-native";
import { storage, auth, db } from "../../../Service/FirebaseConfig";
import ImagePicker from "../../../Components/ImagePicker";

const EditProfile = (props) => {
  console.log("RENDERING EditProfile");

  const [image, setimage] = useState("");
  const [username, setusername] = useState("");

  useEffect(() => {
    return () => console.log("CLEANUP EditProfile");
  }, []);

  const UploadHandler = async (imageuri, username) => {
    console.log(username + "IMAGE: " + !!imageuri);
    
    if (imageuri) {
      const response = await fetch(imageuri);
      const blob = await response.blob();

      var reference = storage
        .ref()
        .child("users/" + auth.currentUser.uid + "/ProfilePic");

      await reference.put(blob).then(console.log("Profile Pic Updated"));
    }

    var ProfilePiclink = "";
    await storage
      .ref()
      .child("users/" + auth.currentUser.uid + "/ProfilePic")
      .getDownloadURL()
      .then((l) => (ProfilePiclink = l));
    await auth.currentUser.updateProfile({
      displayName: username,
      photoURL: ProfilePiclink,
    });
    await db
      .ref()
      .child("users/" + auth.currentUser.uid)
      .update({
        username: username,

        ProfilePicURL: ProfilePiclink,
      });
    await db
      .ref()
      .child("userlist/" + auth.currentUser.uid)
      .update({
        username: username,

        ProfilePicURL: ProfilePiclink,
      });
    props.navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <Text>Iam EditProfile screen !!</Text>
      <ImagePicker
        sendimage={(imageuri) => setimage(imageuri)}
        defaultimage={auth.currentUser.photoURL}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setusername(text)}
        initialValue={auth.currentUser.uid}
      />

      <Button title="Update" onPress={() => UploadHandler(image, username)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    marginBottom: 30,

    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProfile;
