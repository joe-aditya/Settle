import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { Header, Avatar, Icon, Text } from "react-native-elements";
import Colours from "../assets/colors";

import { useSelector } from "react-redux";

const HeaderMeetup = (props) => {
  const data = useSelector((state) => state.Meetup.data);
  return (
    <Header
      centerContainerStyle={{ flex: 1 }}
      leftContainerStyle={{ flex: 9 }}
      rightContainerStyle={{ width: 1 }}
      rightComponent={<></>}
      containerStyle={{ backgroundColor: Colours.Hchat }}
      leftComponent={
        <View>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("HomeTabs");
              }}
              style={{ flexDirection: "row" }}
            >
              <>
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  color="#fff"
                  containerStyle={{ marginRight: 15 }}
                />
                <Avatar
                  source={{
                    uri: "https://banner2.cleanpng.com/20180920/yko/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66df14d32.3051789815374598219884.jpg",
                  }}
                  containerStyle={{ marginRight: 15, borderRadius: 100 }}
                />
              </>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("MeetupProfile");
              }}
              style={{ width: "100%" }}
            >
              <>
                <Text style={styles.meetupName}>{data.meetupName}</Text>

                <View style={{ color: "white" }}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={{ width: "90%", color: Colours.Lgrey }}
                  >
                    {data.members.map((aMember, index) => (
                      <Text key={index} style={{ color: "white" }}>
                        {aMember[1].username}
                      </Text>
                    ))}
                  </Text>
                </View>
              </>
            </TouchableHighlight>
          </View>
        </View>
      }
      // centerComponent={<Text style={styles.header}>{meetupName}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  meetupName: {
    fontSize: 25,
    textAlign: "left",
    color: "#fff",
  },
});

export default HeaderMeetup;
