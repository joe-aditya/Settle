import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Users here "
        onChangeText={(text) => dispatch(searchUsers(text))}
      />

      {searchList.length !== 0 ? (
        <View>
          {searchList.map((aUser, index) => (
            <View key={index}>
              <TouchableHighlight
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("FriendProfile", {
                    params: { friendkey: aUser[0] },
                  })
                }
              >
                <Text>
                  Hello, {aUser[1].username}! {index}
                </Text>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      ) : (
        <Text>Use above Text box to search users</Text>
      )}
      {frndReqlist.length !== 0 && (
        <View>
          <Text>FREIND REQUESTES </Text>

          {frndReqlist.map((aFrndReq, index) => (
            <View key={index}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => acceptFrndReq(aFrndReq[0])}
              >
                <Text>
                  Hello, {aFrndReq[1].username}! {index}
                </Text>
              </TouchableHighlight>
            </View>
          ))}
        </View>
      )}
      {frndlist.length !== 0 && (
        <View>
          <Text>FREINDs</Text>
          {frndlist.map((aFrnd, index) => (
            <View key={index}>
              <Text>{aFrnd[1].username}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 30,
    marginLeft: 30,
    width: "85%",
    justifyContent: "center",
    // alignItems: "center",
  },
  input: {
    borderBottomColor: "red",
    borderBottomWidth: 3,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Search;
