export const SEARCHUSERS = "SEARCHUSERS";
export const ONCURRENTMEETUPS = "ONCURRENTMEETUPS";
export const ONMEETUPREQ = "ONMEETUPREQ";
export const ONFRNDREQ = "ONFRNDREQ";
export const ONFRNDS = "ONFRNDS";

import { db, auth } from "../../Service/FirebaseConfig";

export const acceptMeetupReq = (meetupId) => {
  db.ref("users/" + auth.currentUser.uid + "/meetupReq/" + meetupId).remove();
  db.ref("users/" + auth.currentUser.uid + "/currentRooms/" + meetupId).set(
    true
  );
  db.ref("meetups/" + meetupId + "/data/members/" + auth.currentUser.uid).set(
    true
  );
};
export const onMeetupreq = () => {
  console.log("onMeetupreq");

  return async (dispatch) => {
    const g = async (snap) => {
      if (snap.val()) {
        const extraction = async (meetupkey) => {
          const data = await db
            .ref("meetups/" + meetupkey + "/data")
            .once("value");
          return [meetupkey, data.val()];
        };

        const a1 = Object.keys(snap.val());
        const a2 = await Promise.all(a1.map((i) => extraction(i)));
        // console.log(a2);

        dispatch({
          type: ONMEETUPREQ,
          meetupReq: a2,
        });
      } else {
        dispatch({
          type: ONMEETUPREQ,
          meetupReq: [],
        });
      }
    };
    db.ref("users/" + auth.currentUser.uid + "/meetupReq/").on(
      "value",
      (snap) => {
        g(snap);
      }
    );
  };
};
export const onFrnds = () => {
  console.log("onFrnds");
  return async (dispatch) => {
    const g = async (snap) => {
      if (snap.val()) {
        const extraction = async (key) => {
          const data = await db.ref("userlist/" + key + "/").once("value");
          return [key, data.val()];
        };
        const a1 = Object.keys(snap.val());
        const a2 = await Promise.all(a1.map((i) => extraction(i)));
        // console.log(a2);
        dispatch({
          type: ONFRNDS,
          frnds: a2,
        });
      } else
        dispatch({
          type: ONFRNDS,
          frnds: [],
        });
    };
    db.ref("users/" + auth.currentUser.uid + "/friends/").on(
      "value",
      (snap) => {
        g(snap);
      }
    );
  };
};

export const acceptFrndReq = async (id) => {
  console.log("acceptFrndReq");
  await db.ref("users/" + id + "/friends/" + auth.currentUser.uid).set(true);
  await db.ref("users/" + auth.currentUser.uid + "/friends/" + id).set(true);
  await db.ref("users/" + auth.currentUser.uid + "/friendReq/" + id).remove();
};

export const onFrndReq = () => {
  console.log("onFrndReq");
  return async (dispatch) => {
    const g = async (snap) => {
      if (snap.val()) {
        const extraction = async (key) => {
          const data = await db.ref("userlist/" + key + "/").once("value");
          return [key, data.val()];
        };
        const a1 = Object.keys(snap.val());
        const a2 = await Promise.all(a1.map((i) => extraction(i)));
        // console.log(a2);
        dispatch({
          type: ONFRNDREQ,
          frndReq: a2,
        });
      } else
        dispatch({
          type: ONFRNDREQ,
          frndReq: [],
        });
    };
    db.ref("users/" + auth.currentUser.uid + "/friendReq/").on(
      "value",
      (snap) => {
        g(snap);
      }
    );
  };
};
export const giveFrndReq = (id) => {
  console.log(id);
  db.ref("users/" + id + "/friendReq/" + auth.currentUser.uid).set(true);
};
export const onCurrentMeetups = () => {
  return async (dispatch) => {
    console.log("onCurrentMeetups");

    const g = async (snap) => {
      if (snap.val()) {
        const extraction = async (meetupkey) => {
          const data = await db
            .ref("meetups/" + meetupkey + "/data")
            .once("value");
          return [meetupkey, data.val()];
        };

        const a1 = Object.keys(snap.val());
        const a2 = await Promise.all(a1.map((i) => extraction(i)));
        // console.log(a2);

        dispatch({
          type: ONCURRENTMEETUPS,
          currentMeetups: a2,
        });
      }
    };
    db.ref("users/" + auth.currentUser.uid + "/currentRooms").on(
      "value",
      (snap) => g(snap)
    );
  };
};

export const searchUsers = (text) => {
  return async (dispatch) => {
    console.log("searchUsers");
    if (text) {
      db.ref("userlist/")
        .orderByChild("username")
        .startAt(text)
        .endAt(text + "\uf8ff")
        .once("value")
        .then((snap) => {
          if (snap.val() !== null) {
            const Arr = Object.values(snap.val());
            const Ar = Object.entries(snap.val());
            console.log(Ar);
            dispatch({ type: SEARCHUSERS, Arr: Ar });
          } else {
            console.log("No such User");
            dispatch({ type: SEARCHUSERS, Arr: [] });
          }
        });
    }
  };
};
