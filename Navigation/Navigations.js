import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as MeetupActions from "../Redux/Actions/MeetupActions";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AuthScreen from "../Screens/AuthScreens/AuthScreen";

import EditProfile from "../Screens/HomeScreens/ProfileStackScreens/EditProfile";
import Profile from "../Screens/HomeScreens/ProfileStackScreens/Profile";
import Meetups from "../Screens/HomeScreens/Meetups";
import Search from "../Screens/HomeScreens/Search";
import Invites from "../Screens/HomeScreens/Invites";
import Dummy from "../Screens/HomeScreens/Dummy";

import FriendProfile from "../Screens/HomeScreens/FriendProfile";

import ChatScreen from "../Screens/MeetupScreens/ChatReal";
import Settle from "../Screens/MeetupScreens/Settle";
import Settled from "../Screens/MeetupScreens/Settled";
import MeetupProfile from "../Screens/MeetupScreens/MeetupProfile";

import StartupScreen from "../Screens/StartupScreen";

const Auth = createStackNavigator();
export const AuthStackScreen = () => {
  console.log("RENDERING AuthStackScreen");
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="AuthScreen" component={AuthScreen} />
    </Auth.Navigator>
  );
};

const Root = createStackNavigator();
export const Rootstack = () => {
  console.log("RENDERING Rootstack");

  let isHomeLoaded = useSelector((state) => state.Home.isHomeLoaded);

  // console.log(isHomeLoaded);

  if (isHomeLoaded)
    return (
      <Root.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Root.Screen
          name="HomeTabsScreens"
          component={HomeTabsStackScreens}
          options={{ title: "My home" }}
        />
        <Root.Screen name="MeetupTabs" component={MeetupTabs} />
      </Root.Navigator>
    );
  else return <StartupScreen />;
};

const HomeTabsStack = createStackNavigator();
const HomeTabsStackScreens = () => {
  console.log("RENDERING HomeTabsStackScreens");
  return (
    <HomeTabsStack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{ headerShown: false }}
    >
      <HomeTabsStack.Screen name="HomeTabs" component={HomeTabs} />
      <HomeTabsStack.Screen name="Invites" component={Invites} />
    </HomeTabsStack.Navigator>
  );
};

const Home = createMaterialTopTabNavigator();
export const HomeTabs = () => {
  console.log("RENDERING HomeTabs");

  return (
    <Home.Navigator
      initialRouteName="Meetups"
      backBehavior="initialRoute"
      tabBarPosition="bottom"
    >
      <Home.Screen name="FRIENDS" component={SearchStackScreens} />

      <Home.Screen
        name="Meetups"
        component={Meetups}
        options={{ title: "Meetups" }}
      />
      <Home.Screen name="Dummy" component={Dummy} />

      <Home.Screen name="MY PROFILE" component={ProfileStackScreens} />
    </Home.Navigator>
  );
};
const SearchStack = createStackNavigator();
const SearchStackScreens = () => {
  console.log("RENDERING SearchStackScreens");
  return (
    <SearchStack.Navigator
      initialRouteName="Search"
      screenOptions={{ headerShown: false }}
    >
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="FriendProfile" component={FriendProfile} />
    </SearchStack.Navigator>
  );
};
const ProfileStack = createStackNavigator();
const ProfileStackScreens = () => {
  console.log("RENDERING ProfileStackScreens");
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

const Meetup = createMaterialTopTabNavigator();
export const MeetupTabs = (props) => {
  console.log("RENDERING MeetupTabs");

  const dispatch = useDispatch();
  const meetupId = useSelector((state) => state.Meetup.meetupId);

  const isLoaded = useSelector((state) => state.Meetup.isLoaded);

  useEffect(() => {
    console.log("Listening from MeetupTabs");

    dispatch(MeetupActions.onPrograms(meetupId));
    dispatch(MeetupActions.onMeetupData(meetupId));

    return () => {
      console.log("CLEANUP MeetupTabs ");
      dispatch(MeetupActions.cleaningMeetupTabs(meetupId));
    };
  }, []);
  let ShdIEnter = Object.values(isLoaded).every((x) => x === true);

  if (ShdIEnter) {
    return (
      <Meetup.Navigator
        initialRouteName="Settle"
        backBehavior="initialRoute"
        tabBarPosition="bottom"
      >
        <Meetup.Screen name="Chat" component={ChatScreen} />
        <Meetup.Screen name="Settle" component={Settle} />
        <Meetup.Screen name="Settled" component={Settled} />
        <Meetup.Screen name="MeetupProfile" component={MeetupProfile} />
      </Meetup.Navigator>
    );
  } else return <StartupScreen />;
};
