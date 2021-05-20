import React, { useContext, useRef, useCallback } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import { db, fbServer } from "../Service/FirebaseConfig";
import { useSelector } from "react-redux";
import { handleLike, handleSettle } from "../Redux/Actions/MeetupActions";
import { useState } from "react";
export default function SettleDisplay({ aProgram }) {
  console.log("RENDERING SettleDisplay");
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const membersData = useSelector((state) => state.Meetup.data.members);
  
  const membersDataObject = Object.fromEntries(membersData);

  const [stateSettle, setStateSettle] = useState(false);
  const catArray = Object.entries(aProgram[1].catagories);

  const anim = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true,
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true,
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 20 }
    ).start();
  }, []);

  catArray.sort(sortFunction);

  function sortFunction(a, b) {
    let alength = Object.keys(a[1]).length;
    let blength = Object.keys(b[1]).length;
    if (alength === blength) {
      return 0;
    } else {
      return alength > blength ? -1 : 1;
    }
  }
  // console.log(catArray);
  return (
    <View style={styles.container}>
      <View>
        <Text>{aProgram[1].PmName}</Text>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setStateSettle(!stateSettle);
            shake();
          }}
        >
          <Text>SETTLE</Text>
        </TouchableHighlight>
        {catArray.map((act, index) => (
          <View  key={index}>
            <Animated.View
              style={{ transform: [{ translateX: anim.current }] }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (stateSettle) handleSettle(meetupId, aProgram[0], act[0]);
                }}
              >
                <Text>{act[0]} !!</Text>
              </TouchableOpacity>
            </Animated.View>
            <Text>Liked By </Text>
            {Object.keys(act[1]).map((Auid) => (
              <View key={Auid}>
                <Text>{membersDataObject[Auid].username} </Text>
              </View>
            ))}

            <Button
              title="LIKE"
              onPress={() => handleLike(meetupId, aProgram[0], act[0])}
            />
            <Text>{Object.keys(act[1]).length}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  container: {
    width: "100%",
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
