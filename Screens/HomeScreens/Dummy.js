import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text,TextInput, TouchableOpacity } from "react-native";

import { TouchableHighlight } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  onFrnds,
  searchUsers,
  onFrndReq,
  acceptFrndReq,
} from "../../Redux/Actions/HomeAction";

const Search = (props) => {
  console.log("RENDERING Search");
  const dispatch = useDispatch();

  const searchList = useSelector((state) => state.Home.searchList);
  const frndReqlist = useSelector((state) => state.Home.friendReq);
  const frndlist = useSelector((state) => state.Home.friends);

  useEffect(() => {
    const f = async () => {
      dispatch(onFrndReq());
      dispatch(onFrnds());
    };
    f();
    return () => console.log("CLEANUP Search");
  }, []);

  console.log(frndlist);

  return (
    <View>
      <Text>I AM DUMM Y</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 30,
    marginLeft: 30,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: 3,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Search;
