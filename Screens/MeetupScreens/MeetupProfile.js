import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import MeetupSettingModal from "../../Components/MeetupSettingModal";
import { onFrnds, endMeetupHandler } from "../../Redux/Actions/HomeAction";
import { updateEndDateHandler } from "../../Redux/Actions/MeetupActions";

const MeetupProfile = (props) => {
  console.log("RENDERING MeetupProfile");
  const dispatch = useDispatch();

  console.log(useSelector((state) => state.Meetup.data));

  const meetupID = useSelector((state) => state.Meetup.meetupId);
  const [endDate, setendDate] = useState("");
  useEffect(() => {
    return () => console.log("CLEANUP MeetupProfile");
  }, []);

  const visibilityHandler = () => {
    setModalVisible(!modalVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <TextInput onChangeText={(text) => setendDate(text)}></TextInput>
        <Text>{endDate}</Text>
        <Button
          title="Update End Date"
          onPress={() => updateEndDateHandler(meetupID, endDate)}
        />
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

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          dispatch(endMeetupHandler(meetupID, "inside", props.navigation));
        }}
      >
        <Text style={styles.textStyle}>END MEETUP</Text>
      </TouchableHighlight>
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

export default MeetupProfile;
