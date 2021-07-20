import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import {
  Header,
  SearchBar,
  ListItem,
  Avatar,
  Icon,
  Text,
  Badge,
} from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  acceptMeetupReq,
  endMeetupHandler,
} from "../../Redux/Actions/HomeAction";

const Invites = (props) => {
  const listMeetupreq = useSelector((state) => state.Home.meetupReq);

  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="arrow-left"
            type="font-awesome"
            color="#fff"
            onPress={() => {
              props.navigation.navigate("HomeTabs");
            }}
          />
        }
        centerComponent={{ text: "SETTLE", style: { color: "#fff" } }}
        rightComponent={
          listMeetupreq.length ? 
          <Badge
            status="error"
            containerStyle={{
              position: "absolute",
            }}
            value={listMeetupreq.length}
          /> :
          null
        }
      />
      
      {listMeetupreq.length ? <Text h2>Invites</Text> : <Text h2> No Invites</Text> }

      {listMeetupreq.map((aMeetupreq, index) => (
        <ListItem key={index} bottomDivider>
          <Avatar
            source={{
              uri: "data:image/png;base64,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",
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{aMeetupreq[1].meetupName}</ListItem.Title>
            <ListItem.Subtitle>{aMeetupreq[1].meetupDate}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
          <Button
            title="Accept"
            onPress={() => {
              acceptMeetupReq(aMeetupreq[0]);
              // props.navigation.navigate("Tabs");
            }}
          />
          <Button title="Reject" type="outline" />
        </ListItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});

export default Invites;
