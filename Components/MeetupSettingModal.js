import React, { useState } from "react";
import {
  TextInput,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { giveMeetupReq } from "../Redux/Actions/MeetupActions";

const MeetupSettingModal = (props) => {
  console.log("RENDERING MeetupSettingModal");
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const frndsList = useSelector((state) => state.Home.friends);
  const [list, setlist] = useState([]);
  const searchUsers = (text) => {
    if (text) {
      const startsWithN = frndsList.filter((frnd) =>
        frnd[1].username.startsWith(text)
      );
      console.log(startsWithN);
      setlist(startsWithN);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>FORM :</Text>
            <TextInput
              style={styles.input}
              placeholder="Search Frnds Here "
              onChangeText={(text) => searchUsers(text)}
            />
            {list.length !== 0 ? (
              <View>
                {list.map((person, index) => (
                  <Button
                    title={person[1].username}
                    key={index}
                    onPress={() => {
                      props.handler();
                      giveMeetupReq(person[0], meetupId);
                    }}
                  />
                ))}
              </View>
            ) : (
              <Text>Use above Text box to search users</Text>
            )}
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
  input: {
    height: 40,
    backgroundColor: "white",
    fontSize: 20,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default MeetupSettingModal;
