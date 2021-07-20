import React, { useEffect, useState, useCallback } from "react";
import {
  RefreshControl,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
} from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  SpeedDial,
  Badge,
  Divider,
  Fab,
  BottomSheet,
} from "react-native-elements";
import Colours from "../../assets/colors";
import * as Localization from "expo-localization";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { enterMeetup } from "../../Redux/Actions/MeetupActions";
import {
  acceptMeetupReq,
  endMeetupHandler,
} from "../../Redux/Actions/HomeAction";

import JoinModal from "../../Components/JoinModal";
import CreateModal from "../../Components/CreateModal";

const Meetups = (props) => {
  console.log("RENDERING Meetups");

  const [modalVisible, setModalVisible] = useState(false);

  var td = new Date();
  var tdaDate = new Date(td.getFullYear(), td.getMonth(), td.getDate());
  const unixTday = tdaDate.getTime();

  const diffFinder = (date) => {
    const Datesplit = date.split("-");
    var convertedDate = new Date(Datesplit[2], Datesplit[1] - 1, Datesplit[0]);
    const ans = (convertedDate.getTime() - unixTday) / 86400000;
    return ans;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    return () => console.log("CLEANUP Meetups");
  }, []);

  // console.log(useSelector((state) => state));
  const listMeetups = useSelector((state) => state.Home.currentMeetups);
  const listMeetupreq = useSelector((state) => state.Home.meetupReq);
  // console.log(listMeetupreq);
  console.log(listMeetups);
  const visibilityHandler = () => {
    setModalVisible(!modalVisible);
  };

  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);

  const list = [
    {
      title: "Cancel",
      containerStyle: { backgroundColor: Colours.cancel },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View>
      <Header
        containerStyle={
          {
            // height: 300,
          }
        }
        leftComponent={
          <>
            <Icon
              name="envelope"
              type="font-awesome"
              color="#fff"
              onPress={() => {
                props.navigation.navigate("Invites");
              }}
            />
            {listMeetupreq.length != 0 && (
              <Badge
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: -3,
                  right: 41,
                }}
                value={listMeetupreq.length}
              />
            )}
          </>
        }
        centerComponent={{ text: "SETTLE", style: { color: "#fff" } }}
        rightComponent={
          <Icon
            name="plus-circle"
            type="font-awesome"
            color="white"
            onPress={() => setIsVisible(true)}
          />
        }
      />
      <View style={styles.story}>
        <Text>Highlights coming here soon</Text>
      </View>
      <View>
        {listMeetups.length != 0 ? (
          <View>
            {listMeetups.map((aMeetup, index) => {
              const diffMeetup = diffFinder(aMeetup[1].meetupDate);
              const diffEnd = diffFinder(aMeetup[1].endDate);
              console.log(diffMeetup);
              const show = diffMeetup < 0 ? diffEnd : diffMeetup;
              console.log(show);
              if (show < 0) {
                dispatch(endMeetupHandler(aMeetup[0]));
              }
              return (
                <ListItem key={index} bottomDivider>
                  <TouchableOpacity
                    style={styles.nod}
                    onPress={() => {
                      dispatch(enterMeetup(aMeetup[0], props.navigation));
                    }}
                  >
                    <Avatar
                      source={{
                        uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title>{aMeetup[1].meetupName}</ListItem.Title>
                      <ListItem.Subtitle>
                        {show + " days to go "}
                      </ListItem.Subtitle>
                      <ListItem.Subtitle>
                        {aMeetup[1].meetupDate}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </TouchableOpacity>
                </ListItem>
              );
            })}
          </View>
        ) : (
          <View>
            <Text>Create or Join a meet</Text>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <BottomSheet
          isVisible={isVisible}
          containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
        >
          <View style={styles.optionContainer}>
            <TouchableHighlight
              style={styles.option}
              onPress={() => {
                setIsVisible(false);
                setCreateModal(true);
              }}
            >
              <Text style={styles.optiontxt}>Create</Text>
            </TouchableHighlight>

            <Divider orientation="horizontal" />

            <TouchableHighlight
              style={styles.option}
              onPress={() => {
                setIsVisible(false);
                setJoinModal(true);
              }}
            >
              <Text style={styles.optiontxt}>Join</Text>
            </TouchableHighlight>

            <Divider orientation="horizontal" />

            <TouchableHighlight
              style={styles.cancel}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.optiontxt}>Close</Text>
            </TouchableHighlight>
          </View>
        </BottomSheet>
      </TouchableWithoutFeedback>
      {createModal && (
        <CreateModal close={() => setCreateModal((state) => !state)} />
      )}
      {joinModal && <JoinModal close={() => setJoinModal((state) => !state)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  nod: {
    width: "100%",
    height: 100,
  },
  optionContainer: {
    marginHorizontal: 10,
  },
  option: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
    alignContent: "space-around",
    marginBottom: 10,
  },
  optiontxt: {
    fontSize: 25,
    textAlignVertical: "center",
  },
  cancel: {
    backgroundColor: Colours.cancel,
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignContent: "space-around",
    marginBottom: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: 100,
    marginBottom: 100,
  },
  story: {
    backgroundColor: "#4e0027",
    borderBottomWidth: 1,
  },
});

export default Meetups;
