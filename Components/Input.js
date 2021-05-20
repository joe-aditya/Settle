import React, { useCallback, useContext, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../Service/FirebaseConfig";
import Button from "./Button";
import { useSelector } from "react-redux";

export default function Input() {
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handlePress = useCallback(
    function () {
      if (message !== "") {
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
          placeholder="Write you message"
        />
      </View>

      <Button text="Send" onPress={handlePress} disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  inputContainer: {
    width: "70%",
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
