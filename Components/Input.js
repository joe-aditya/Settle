import React, { useCallback, useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../Service/FirebaseConfig";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

export default function Input() {
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = useCallback(
    function () {
      if (message !== "" && !isLoading) {
        db.ref("meetups/" + meetupId + "/messages/")
          .push({
            message,
            user_id: auth.currentUser.uid,
            created_at: new Date().getTime(),
          })
          .then(() => {
            console.log("MSG SENT");
            setIsLoading(false);
            setMessage("");
          });
      }
    },
    [message]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Write your message"
        />
      </View>
      <View style={styles.send}>
      <Icon
        name="paper-plane"
        type="font-awesome"
        size={25}
        color="white"
        onPress={handlePress}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // backgroundColor: "pink",
  },
  inputContainer: {
    width: "85%",
    borderRadius: 100,
    height: 50,
    marginRight: 10,
    backgroundColor: "#435A64",
  },
  input: {
    flex: 1,
    fontSize: 18,
    // borderColor: "grey",
    // borderWidth: 1,
    borderRadius: 100,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  send: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 10,
    borderRadius: 40,
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#128C7E",
  },
});
