import {
  SEARCHUSERS,
  ONCURRENTMEETUPS,
  ONFRNDREQ,
  ONMEETUPREQ,
  ONFRNDS,
} from "../Actions/HomeAction";
import { HOMECLEANUP } from "../Actions/AuthActions";

const initialState = {
  isHomeLoaded: false,
  searchList: [],
  currentMeetups: [],
  friends: [],
  bio: "",
  timeline: [],
  meetupReq: [],
  friendReq: [],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOMECLEANUP:
      return {
        ...initialState,
      };
    case SEARCHUSERS:
      return {
        ...state,
        searchList: action.Arr,
      };
    case ONCURRENTMEETUPS:
      return {
        ...state,
        currentMeetups: action.currentMeetups,
        isHomeLoaded: true,
      };
    case ONMEETUPREQ:
      return {
        ...state,
        meetupReq: action.meetupReq,
      };
    case ONFRNDREQ:
      return {
        ...state,
        friendReq: action.frndReq,
      };
    case ONFRNDS:
      return {
        ...state,
        friends: action.frnds,
      };
    default:
      return state;
  }
};

export default HomeReducer;
