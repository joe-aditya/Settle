import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  SpeedDial,
  Badge,
  Fab,
  Text,
} from "react-native-elements";
import Colours from "../../assets/colors";
import SettleDisplay from "../../Components/SettleDisplay";
import SettleModal from "../../Components/SettleModal";
import { useSelector } from "react-redux";
const Settle = (props) => {
  console.log("RENDERING Settle");
  useEffect(() => {
    return () => console.log("CLEANUP Settle");
  }, []);
  const data = useSelector((state) => state.Meetup.data);
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
    <View>
      <Header
        centerContainerStyle={{ flex: 1 }}
        leftContainerStyle={{ flex: 9 }}
        rightContainerStyle={{ width: 1 }}
        rightComponent={<></>}
        containerStyle={{ backgroundColor: Colours.Hchat }}
        leftComponent={
          <View>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="arrow-left"
                type="font-awesome"
                color="#fff"
                onPress={() => {
                  props.navigation.navigate("HomeTabs");
                }}
                containerStyle={{ marginRight: 15 }}
              />
              <Avatar
                source={{
                  uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                }}
                containerStyle={{ marginRight: 15, borderRadius: 100 }}
              />
              <Text style={styles.header}>{data.meetupName}</Text>
            </View>
            <View style={{ marginLeft: 85, color: "white" }}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={{width:'90%', color: Colours.Lgrey}}>
                
              </Text>
            </View>
          </View>
        }
        // centerComponent={<Text style={styles.header}>{meetupName}</Text>}
      />
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
  header: {
    fontSize: 25,
    textAlign: "left",
    color: "#fff",
  },
  // mem: {
  //   white-space: nowrap, overflow:hidden, text-overflow:ellipsis,
  // }
});

export default Settle;
