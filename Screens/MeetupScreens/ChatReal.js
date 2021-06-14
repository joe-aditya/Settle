import React, { useEffect } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../Components/Input";
import Message from "../../Components/Message";
import { onMessages } from "../../Redux/Actions/MeetupActions";
export default function Chat(props) {

  console.log("RENDERING Chat");

  const meetupId = useSelector((state) => state.Meetup.meetupId);

  const messages = useSelector((state) => state.Meetup.messages);

  const userId = useSelector((state) => state.Auth.userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onMessages(meetupId));
    
    return () => console.log("CLEANUP Chatreal");
  }, []);

  const mock = [
    { created_at: 1, message: "Hello", user_id: userId },
    { created_at: 2, message: "Hi!", user_id: "Other User" },
  ];

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        {messages.length != 0 && (
          <FlatList
            // inverted
            data={messages}
            keyExtractor={function (item) {
              return item.created_at.toString();
            }}
            renderItem={function ({ item }) {
              const data = item;
              const side = data.user_id === userId ? "right" : "left";
              return (
                <Message
                  side={side}
                  message={data.message}
                  userId={data.user_id}
                />
              );
            }}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    height: "100%",
    paddingBottom: 100,
  },
  inputContainer: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 2,
    borderTopColor: "grey",
  },
});
