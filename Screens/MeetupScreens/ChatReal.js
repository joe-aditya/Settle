import React, { useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  ImageBackground,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
  //uri: "https://reactjs.org/logo-og.png",
  uri: "https://i.redd.it/ts7vuoswhwf41.jpg",
};

export default function Gummy(props) {
  console.log("RENDERING Chat");

  const data = useSelector((state) => state.Meetup.data);

  const meetupId = useSelector((state) => state.Meetup.meetupId);

  const messages = useSelector((state) => state.Meetup.messages);

  const userId = useSelector((state) => state.Auth.userId);

  const dispatch = useDispatch();

  const scrollViewRef = useRef();

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
            centerContainerStyle={{ flex: 1 }}
            leftContainerStyle={{ flex: 9 }}
            rightContainerStyle={{ width: 1 }}
            rightComponent={<></>}
            containerStyle={{ backgroundColor: Colours.Hchat }}
            leftComponent={
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name="arrow-left"
                    type="font-awesome"
                    color="#fff"
                    onPress={() => {
                      props.navigation.navigate("HomeTabs");
                    }}
                    containerStyle={{ marginRight: 15 }}
                  />
                  <Avatar
                    source={{
                      uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                    }}
                    containerStyle={{ marginRight: 15, borderRadius: 100 }}
                  />
                  <Text style={styles.header}>{data.meetupName}</Text>
                </View>
                <View style={{ marginLeft: 85, color: "white" }}>
                  <Text style={{ color: Colours.Lgrey }}>
                    {data.description}
                  </Text>
                </View>
              </View>
            }
            // centerComponent={<Text style={styles.header}>{meetupName}</Text>}
          />

          <View style={styles.body}>
            <ScrollView ref={scrollViewRef}>
              <View>
                {messages.length !== 0 && (
                  <View>
                    {messages.map((aMsg, index) => {
                      const side = aMsg.user_id === userId ? "right" : "left";
                      return (
                        <Message
                          key={index}
                          side={side}
                          message={aMsg.message}
                          userId={aMsg.user_id}
                          time={aMsg.created_at}
                        />
                      );
                    })}
                  </View>
                )}
                {/* {messages.length != 0 && (
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
            )} */}
              </View>
            </ScrollView>
          </View>

          <View style={styles.input}>
            <View style={styles.scroll}>
              <Icon
                name="angle-double-down"
                type="font-awesome"
                size={25}
                color="white"
                onPress={() =>
                  scrollViewRef.current.scrollToEnd({ animated: true })
                }
              />
            </View>
            <Input sd={scrollViewRef} />
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
  header: {
    fontSize: 25,
    textAlign: "left",
    color: "#fff",
  },
  input: {
    position: "absolute",
    bottom: 0,
  },
  body: {
    flex: 1,
    width: "100%",
    color: "#fff",
    height: "75%",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  bg: {
    flex: 1,
    // resizeMode: "cover",
  },
  scroll: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.5,
    elevation: 10,
    borderRadius: 40,
    width: 25,
    height: 25,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#128C7E",
  },
});
