import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, View, Button, FlatList } from "react-native";
import { unsettleHandler } from "../../Redux/Actions/MeetupActions";
import { auth, db } from "../../Service/FirebaseConfig";
import SettleDisplay from "../../Components/SettleDisplay";
import { useSelector } from "react-redux";
const Consolidation = (props) => {
  console.log("RENDERING Consolidation");

  const meetupId = useSelector((state) => state.Meetup.meetupId);
  // console.log(meetupId);
  useEffect(() => {
    return () => console.log("CLEANUP Consolidation");
  }, []);

  const programs = useSelector((state) => state.Meetup.programs);

  return (
    <View style={styles.container}>
      <Text>SETTLED</Text>
      {programs.length != 0 && (
        <FlatList
          data={programs}
          keyExtractor={() => {
            const x = Math.random().toString();
            return x;
          }}
          renderItem={({ item }) => {
            if (item[1].status === "Settled")
              return (
                <View style={{ flexDirection: "row" }}>
                  <Text>{item[1].PmName} : </Text>

                  <Text>{item[1].Final} </Text>
                  <Button
                    title="UNSETTLE"
                    onPress={() => unsettleHandler(meetupId, item[0])}
                  />
                </View>
              );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 30,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default Consolidation;
