export const AUTHSTATE = "AUTHSTATE";
export const HOMECLEANUP = "HOMECLEANUP";

import { auth, db } from "../../Service/FirebaseConfig";

export const authState = (User) => {
  return async (dispatch) => {
    if (User) {
      dispatch({
        type: AUTHSTATE,
        UserState: !!User,
        userId: User.uid,
        username: User.displayName,
        email: User.email,
        picUrl: User.photoURL,
      });
    } else {
      dispatch({
        type: AUTHSTATE,
        UserState: !!User,
        userId: null,
        username: "",
        picUrl: "",
        email: "",
      });
    }
  };
};

export const signup = (email, pw, username) => {
  return async () => {
    console.log("Trying to SignUp");

    const response = await auth.createUserWithEmailAndPassword(email, pw);

    await auth.currentUser.updateProfile({
      displayName: username,
    });

    const userId = auth.currentUser.uid;
    const USERNAME = auth.currentUser.displayName;

    db.ref()
      .child("users/" + userId)
      .set({ email, username: USERNAME });
    db.ref()
      .child("userlist/" + userId)
      .set({ username: USERNAME });
  };
};

export const login = (email, pw) => {
  return async () => {
    console.log("Trying to Login");
    const response = await auth.signInWithEmailAndPassword(email, pw);
  };
};

export const logout = () => {
  return async (dispatch) => {
    const NowSignout = () => {
      auth.signOut();
    };

    await db
      .ref("users/" + auth.currentUser.uid + "/currentMeetups")
      .off("value");
    await db.ref("users/" + auth.currentUser.uid + "/meetupReq/").off("value");
    await db.ref("users/" + auth.currentUser.uid + "/friendReq/").off("value");
    await db.ref("users/" + auth.currentUser.uid + "/friends/").off("value");
    NowSignout();
    dispatch({ type: HOMECLEANUP });
  };
};
