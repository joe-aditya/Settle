import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as MeetupActions from "../Redux/Actions/MeetupActions";
import * as HomeActions from "../Redux/Actions/HomeAction";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AuthScreen from "../Screens/AuthScreens/AuthScreen";

import EditProfile from "../Screens/HomeScreens/ProfileStackScreens/EditProfile";
import Profile from "../Screens/HomeScreens/ProfileStackScreens/Profile";
import Meetups from "../Screens/HomeScreens/Meetups";
import Search from "../Screens/HomeScreens/Search";
import FriendProfile from "../Screens/HomeScreens/FriendProfile";

// import Location from "../Screens/MeetupScreens/Location";
import ChatScreen from "../Screens/MeetupScreens/ChatReal";
import Settle from "../Screens/MeetupScreens/Settle";
import Consolidation from "../Screens/MeetupScreens/Consolidation";
import MeetupSettings from "../Screens/MeetupScreens/MeetupSettings";
import StartupScreen from "../Screens/StartupScreen";

const auth = createStackNavigator();
export const AuthStackScreen = () => {
  console.log("RENDERING AuthStackScreen");
  return (
    <auth.Navigator>
      <auth.Screen name="AuthScreen" component={AuthScreen} />
    </auth.Navigator>
  );
};

const Root = createStackNavigator();
export const Rootstack = () => {
  console.log("RENDERING Rootstack");
  let isHomeLoaded = useSelector((state) => state.Home.isHomeLoaded);
  if (isHomeLoaded)
    return (
      <Root.Navigator>
        <Root.Screen name="HomeTabs" component={HomeTabs} />
        <Root.Screen name="MeetupTabs" component={MeetupTabs} />
      </Root.Navigator>
    );
  else return <StartupScreen />;
};

const Home = createMaterialTopTabNavigator();
export const HomeTabs = () => {
  console.log("RENDERING HomeTabs");

  return (
    <Home.Navigator
      initialRouteName="Meetups"
      backBehavior="initialRoute"
      tabBarPosition="bottom"
      lazy="true"
    >
      <Home.Screen name="SearchStackScreens" component={SearchStackScreens} />

      <Home.Screen name="Meetups" component={Meetups} />

      <Home.Screen name="ProfileStackScreens" component={ProfileStackScreens} />
    </Home.Navigator>
  );
};
const SearchStack = createStackNavigator();
const SearchStackScreens = () => {
  console.log("RENDERING SearchStackScreens");
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="FriendProfile" component={FriendProfile} />
    </SearchStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();
const ProfileStackScreens = () => {
  console.log("RENDERING ProfileStackScreens");
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

const Meetup = createMaterialTopTabNavigator();
export const MeetupTabs = (props) => {
  console.log("RENDERING MeetupTabs");
  const dispatch = useDispatch();

  // console.log([true, true]);
  const meetupId = useSelector((state) => state.Meetup.meetupId);
  const isLoaded = useSelector((state) => state.Meetup.isLoaded);

  console.log(meetupId);
  useEffect(() => {
    const f = async () => {
      console.log("Listening from MeetupTabs");

      dispatch(MeetupActions.onPrograms(meetupId));
      dispatch(MeetupActions.onData(meetupId));
    };
    f();
    return () => {
      console.log("CLEANUP MeetupTabs ");
      dispatch(MeetupActions.cleaningMeetupTabs(meetupId));
    };
  }, []);
  let ShdIEnter = Object.values(isLoaded).every((v) => v === true);
  if (ShdIEnter) {
    return (
      <Meetup.Navigator
        initialRouteName="Settle"
        backBehavior="initialRoute"
        tabBarPosition="bottom"
        lazy="true"
      >
        {/* <Meetup.Screen name="Location" component={Location} /> */}
        <Meetup.Screen name="Chat" component={ChatScreen} />
        <Meetup.Screen name="Consolidation" component={Consolidation} />
        <Meetup.Screen name="Settle" component={Settle} />
        <Meetup.Screen name="MeetupSettings" component={MeetupSettings} />
      </Meetup.Navigator>
    );
  } else return <StartupScreen />;
};
