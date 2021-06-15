import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import RootNavigation from "./Navigation/RootNavigation";

import { LogBox } from "react-native";
import _ from "lodash";
LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  console.log("RENDERING");
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
