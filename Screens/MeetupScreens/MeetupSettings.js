import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import MeetupSettingModal from "../../Components/MeetupSettingModal";
import { onFrnds } from "../../Redux/Actions/HomeAction";
const MeetupSettings = (props) => {
  console.log("RENDERING MeetupSettings");
  const dispatch = useDispatch();
  useEffect(() => {
    return () => console.log("CLEANUP MeetupSettings");
  }, []);
  const visibilityHandler = () => {
    setModalVisible(!modalVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
            dispatch(onFrnds());
          }}
        >
          <Text style={styles.textStyle}>ADD FRNDS</Text>
        </TouchableHighlight>
        {modalVisible && (
          <MeetupSettingModal
            handler={visibilityHandler}
            modalVisible
            navigation={props.navigation}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default MeetupSettings;
