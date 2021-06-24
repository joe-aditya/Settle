import React, { useState } from "react";
import { createMeetup, joinMeetup } from "../Redux/Actions/MeetupActions";
import {
  Alert,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

const modal = (props) => {
  const [meetupName, setmeetupName] = useState("");
  const dispatch = useDispatch();
  // const meetupId = useSelector((state) => state.Meetup.meetupId);
  const [join, setjoin] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 20,
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
              }}
              keyboardType="default"
              placeholder="room-name"
              value={meetupName}
              onChangeText={(text) => setmeetupName(text)}
            />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                dispatch(createMeetup(meetupName, props));
              }}
            >
              <Text style={styles.textStyle}>Create Room </Text>

            </TouchableHighlight>
            <Button
              title="X"
              onPress={() => {
                props.close();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default modal;
