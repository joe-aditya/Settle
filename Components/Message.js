import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function Message({ message, side, userId, time }) {
  // console.log(userId);
  const isLeftSide = side === "left";
  const membersObj = Object.fromEntries(
    useSelector((state) => state.Meetup.data.members)
  );
  // console.log(membersObj);

  const containerStyles = isLeftSide
    ? styles.container
    : flattenedStyles.container;
  const textContainerStyles = isLeftSide
    ? styles.textContainer
    : flattenedStyles.textContainer;
  const textStyles = isLeftSide
    ? flattenedStyles.leftText
    : flattenedStyles.rightText;

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text>{membersObj[userId].username}</Text>
        <Text style={textStyles}>{message}</Text>
        <Text style={textStyles}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textContainer: {
    maxWidth: '80%',
    backgroundColor: "grey",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginLeft: 10,
  },
  rightContainer: {
    justifyContent: "flex-end",
  },
  rightTextContainer: {
    backgroundColor: "#075E54",
    marginRight: 10,
  },
  leftText: {
    textAlign: "left",
  },
  rightText: {
    textAlign: "left",
  },
  text: {
    fontSize: 12,
  },
});

const flattenedStyles = {
  container: StyleSheet.flatten([styles.container, styles.rightContainer]),
  textContainer: StyleSheet.flatten([
    styles.textContainer,
    styles.rightTextContainer,
  ]),
  leftText: StyleSheet.flatten([styles.leftText, styles.text]),
  rightText: StyleSheet.flatten([styles.rightText, styles.text]),
};
