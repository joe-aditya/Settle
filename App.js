import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import RootNavigation from "./Navigation/RootNavigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { LogBox } from "react-native";
import _ from "lodash";
LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto": "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  console.log("RENDERING App");
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
