import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import RootNavigation from "./Navigation/RootNavigation";
import AppLoading from "expo-app-loading";

import { LogBox } from "react-native";
import { useFonts } from "expo-font";

import _ from "lodash";
LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  let [fontsLoaded] = useFonts({
    "Inter-SemiBoldItalic":
      "https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12",
    Roboto_medium:
      "https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap",
      
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
