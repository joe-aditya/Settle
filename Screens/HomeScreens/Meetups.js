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
    <View style={styles.container}>
      {listMeetupreq.length !== 0 && (
        <View>
          <Text>MEETUPREQ</Text>
          <FlatList
            data={listMeetupreq}
            keyExtractor={() => Math.random().toString()}
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
            keyExtractor={() => Math.random().toString()}
            renderItem={({ item }) => {
              const diffMeetup = diffFinder(item[1].meetupDate);
              const diffEnd = diffFinder(item[1].endDate);
              console.log(diffMeetup);
              const show = diffMeetup < 0 ? diffEnd : diffMeetup;
              console.log(show);

              if (show < 0) {
                dispatch(endMeetupHandler(item[0]));
              }
              return (
                <View>
                  {show >= 0 ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        dispatch(enterMeetup(item[0], props.navigation));
                      }}
                    >
                      <Text>{item[1].meetupName}</Text>

                      <Text>{item[1].meetupDate}</Text>
                      <Text>{show + " to go "}</Text>

                      <Text>{item[1].endDate}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                     
                      <Text>ENsdddddddddddddddddsddsdsDING : BYE BYE </Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Text>JUST A SECOND </Text>
      )}
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <AntDesign name="pluscircle" size={24} color="black" />
        </TouchableOpacity>
        {modalVisible && (
          <Modal
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
