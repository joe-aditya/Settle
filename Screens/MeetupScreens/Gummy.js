import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Colours from "../../assets/colors";

export default function Gummy(props) {
  return (
    <View style={styles.screen}>
      <Text>hiiiiiiiiiiiiiiii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent:"center",
    alignContent: "center",
    backgroundColor: Colours.chatBG,
  },
});
