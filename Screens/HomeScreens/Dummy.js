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
  TextInput,
  Button,
} from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  Badge,
} from "react-native-elements";
import * as Localization from "expo-localization";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { enterMeetup } from "../../Redux/Actions/MeetupActions";
import {
  acceptMeetupReq,
  endMeetupHandler,
} from "../../Redux/Actions/HomeAction";

import Modal from "../../Components/modal";

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

  return (
    <View>
      <Header
        leftComponent={
          <Icon name='plus-circle' type='font-awesome' color='#fff'/>
        }
        centerComponent={{ text: "SETTLE", style: { color: "#fff" } }}
        rightComponent={
          <Icon name='plus-circle' type='font-awesome' color='#fff'/>
        }
      />

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
});

export default Meetups;
