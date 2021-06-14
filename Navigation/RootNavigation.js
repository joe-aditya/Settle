import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { authState } from "../Redux/Actions/AuthActions";
import { AuthStackScreen, Rootstack } from "./Navigations";
import StartupScreen from "../Screens/StartupScreen";
import { auth } from "../Service/FirebaseConfig";

import { onMeetupreq, onCurrentMeetups } from "../Redux/Actions/HomeAction";
const RootNavigation = () => {
  console.log("RENDERING RootNavigation");
  const isAuth = useSelector((state) => state.Auth.isAuth);

  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("onAuthStatechanged : User State : " + !!user);

      if (!!user) {
        dispatch(onCurrentMeetups());
        dispatch(onMeetupreq());
      }
      
      dispatch(authState(user));
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuth === 1 && <StartupScreen />}
      {isAuth === true && <Rootstack />}
      {!isAuth && <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default RootNavigation;
