import { combineReducers } from "redux";
import AuthReducer from "./Reducers/AuthReducer";
import MeetupReducer from "./Reducers/MeetupReducer";
import HomeReducer from "./Reducers/HomeReducer";
const rootReducer = combineReducers({
  Auth: AuthReducer,
  Meetup: MeetupReducer,
  Home: HomeReducer,
});

export default rootReducer;
