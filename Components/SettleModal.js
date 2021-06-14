import React, { useState } from "react";
import { db } from "../Service/FirebaseConfig";
import {
  createProgram,
  editProgramHandler,
} from "../Redux/Actions/MeetupActions";
import {
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useSelector } from "react-redux";

const SettleModal = (props) => {
  console.log("RENDERING SettleModal");
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const userId = useSelector((state) => state.Auth.userId);
  const [x, setx] = useState(props.editProgram[1]);

  console.log(x);
  const [addState, setaddState] = useState(false);
  const [input, setInput] = useState("");
  // const data = [
  //   [
  //     "Ag",
  //     {
  //       Final: "",
  //       PmName: "Ag",
  //       catagories: {
  //         Bb: { xx: "test" },
  //         Nn: 1,
  //       },
  //       status: "Settle",
  //     },
  //   ],
  // ];
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
              defaultValue={x.PmName}
              onChangeText={(text) => setx({ ...x, PmName: text })}
            />
            <FlatList
              data={Object.entries(x.catagories)}
              keyExtractor={() => {
                const y = Math.random().toString();
                return y;
              }}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text>{item[0]}</Text>
                  </View>
                );
              }}
            />
            {addState && (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setInput(text)}
                />
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "green" }}
                  onPress={() => {
                    setaddState(false);
                    setx({
                      ...x,
                      catagories: {
                        ...x.catagories,
                        [input]: { [userId]: true },
                      },
                    });
                  }}
                >
                  <Text style={styles.textStyle}>TICK SIGN </Text>
                </TouchableHighlight>
              </View>
            )}

            {!addState && (
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setaddState(true);
                }}
              >
                <Text style={styles.textStyle}>ADD ICON </Text>
              </TouchableHighlight>
            )}

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                if (props.editProgram[0] === "") createProgram(meetupId, x);
                else {
                  editProgramHandler(meetupId, x, props.editProgram[0]);
                  props.xhandler();
                }
                props.handler();
              }}
            >
              <Text style={styles.textStyle}>UPDATE </Text>
            </TouchableHighlight>
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

export default SettleModal;
