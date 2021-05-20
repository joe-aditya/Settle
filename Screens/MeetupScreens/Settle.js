import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native";
import SettleDisplay from "../../Components/SettleDisplay";
import SettleModal from "../../Components/SettleModal";
import { useSelector } from "react-redux";
const Settle = (props) => {
  console.log("RENDERING Settle");
  useEffect(() => {
    return () => console.log("CLEANUP Settle");
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const displayPrograms = useSelector((state) => state.Meetup.programs);
  const [editProgram, seteditProgram] = useState([
    "",
    {
      Final: "",
      PmName: "",
      catagories: {},
      status: "Settle",
    },
  ]);
  // console.log(useSelector((state) => state));
  const visibilityHandler = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {displayPrograms.length != 0 && (
        <FlatList
          data={displayPrograms}
          keyExtractor={() => {
            const x = Math.random().toString();
            return x;
          }}
          renderItem={({ item }) => {
            // console.log(item);
            if (item[1].status === "Settle")
              return (
                <View>
                  <SettleDisplay aProgram={item} />
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "red" }}
                    onPress={() => {
                      seteditProgram(item);
                      setModalVisible(true);
                    }}
                  >
                    <Text style={styles.textStyle}>ADD ICON </Text>
                  </TouchableHighlight>
                </View>
              );
          }}
        />
      )}
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>CREATE</Text>
      </TouchableHighlight>

      {modalVisible && (
        <SettleModal
          xhandler={() =>
            seteditProgram([
              "",
              {
                Final: "",
                PmName: "",
                catagories: {},
                status: "Settle",
              },
            ])
          }
          handler={visibilityHandler}
          modalVisible
          editProgram={editProgram}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
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
});

export default Settle;
