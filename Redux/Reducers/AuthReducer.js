import { AUTHSTATE } from "../Actions/AuthActions";

const initialState = {
  isAuth: 1,
  userId: null,
  username: "",
  picUrl: "",
  email: "",
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHSTATE:
      return {
        ...initialState,
        isAuth: action.UserState,
        userId: action.userId,
        username: action.username,
        email: action.email,
        picUrl: action.picUrl,
      };

    default:
      return state;
  }
};

export default AuthReducer;
