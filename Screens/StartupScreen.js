import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { ActivityIndicator, StyleSheet } from "react-native";

export default function startupScreen() {
  console.log("RENDERING StartupScreen");
  useEffect(() => {
    return ()=>console.log("CLEANUP StartupScreen");
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={{ fontSize: 50 }}> STARTUP SCREEN </Text>

      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
