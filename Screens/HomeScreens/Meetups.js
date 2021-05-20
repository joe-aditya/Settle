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
import StartupScreen from "../StartupScreen";
import { logout } from "../../Redux/Actions/AuthActions";

import { useSelector, useDispatch } from "react-redux";

import { enterMeetup } from "../../Redux/Actions/MeetupActions";
import { acceptMeetupReq } from "../../Redux/Actions/HomeAction";

import Modal from "../../Components/modal";

const Meetups = (props) => {
  console.log("RENDERING Meetups");

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => console.log("CLEANUP Meetups");
  }, []);

  // console.log(useSelector((state) => state));
  const listMeetups = useSelector((state) => state.Home.currentMeetups);
  const listMeetupreq = useSelector((state) => state.Home.meetupReq);
  // console.log(listMeetupreq);
  // console.log(listMeetups);
  const visibilityHandler = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {listMeetupreq.length !== 0 && (
        <View>
          <Text>MEETUPREQ</Text>
          <FlatList
            data={listMeetupreq}
            keyExtractor={() => {
              const x = Math.random().toString();
              return x;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    acceptMeetupReq(item[0]);
                  }}
                >
                  <Text>{item[1].meetupName}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {listMeetups.length !== 0 ? (
        <View>
          <Text>MEETUPS</Text>

          <FlatList
            data={listMeetups}
            keyExtractor={() => {
              const x = Math.random().toString();
              return x;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    dispatch(enterMeetup(item[0], props.navigation));
                  }}
                >
                  <Text>{item[1].meetupName}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <Text>JUST A SECOND </Text>
      )}
      <View>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>plus icon </Text>
        </TouchableHighlight>
        {modalVisible && (
          <Modal
            handler={visibilityHandler}
            modalVisible
            navigation={props.navigation}
          />
        )}
      </View>
      <Button title="Signout" onPress={() => dispatch(logout())} />
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
