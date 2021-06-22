import React, { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  ImageBackground,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  SpeedDial,
  Badge,
  Fab,
  Text,
} from "react-native-elements";
import Colours from "../../assets/colors";
import Input from "../../Components/Input";
import Message from "../../Components/Message";
import { onMessages } from "../../Redux/Actions/MeetupActions";
import { Colors } from "react-native/Libraries/NewAppScreen";

const image = {
  uri: "https://reactjs.org/logo-og.png",
 // uri: "https://shorturl.at/uvAY0",
};

export default function Gummy(props) {
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
    { created_at: 2, message: "Hi!", user_id: userId },
  ];
  
  return (
    <ImageBackground source={image} style={styles.bg}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Header
            centerComponent={{ text: "SETTLE", style: { color: "#fff" } }}
          />

          <View style={styles.body}>
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

          <View style={styles.input}>
            <Input />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: Colours.chatBG,
  },
  input: {
    position: "absolute",
    bottom: 0,
  },
  body: {
    width: "100%",
    color: "#fff",
  },
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
});
