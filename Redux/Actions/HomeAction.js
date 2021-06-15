export const SEARCHUSERS = "SEARCHUSERS";
export const ONCURRENTMEETUPS = "ONCURRENTMEETUPS";
export const ONMEETUPREQ = "ONMEETUPREQ";
export const ONFRNDREQ = "ONFRNDREQ";
export const ONFRNDS = "ONFRNDS";
export const ENDMEETUPHANDLER = "ENDMEETUPHANDLER";
import { db, auth } from "../../Service/FirebaseConfig";

export const endMeetupHandler = (meetupkey, where = "outside", nav = null) => {
  if (where == "inside") nav.navigate("HomeTabs");
  return async (dispatch) => {
    console.log("ENDMEETUPHANDLER");

    const gonnatransferMeetupdata = await db
      .ref("meetups/" + meetupkey + "/imp")
      .once("value");

    db.ref("endedMeetups/" + meetupkey).set(gonnatransferMeetupdata.val());

    const membersKeys = Object.keys(gonnatransferMeetupdata.val().data.members);

    membersKeys.forEach((key) => {
      db.ref("users/" + key + "/timeline/" + meetupkey).set(true);
      db.ref("users/" + key + "/highlights/" + meetupkey).set(true);

      db.ref("users/" + key + "/currentMeetups/" + meetupkey).remove();
    });

    membersKeys.forEach(async (memberkey) => {
      const AMembersFrnds = await db
        .ref("users/" + memberkey + "/friends/")
        .once("value");
      if (AMembersFrnds.val()) {
        const list = Object.keys(AMembersFrnds.val());
        list.forEach((memberFrndkey) =>
          db
            .ref("users/" + memberFrndkey + "/highlights/" + meetupkey)
            .set(true)
        );
      }
    });
  };
};
export const acceptFrndReq = async (id) => {
  console.log("acceptFrndReq");
  await db.ref("users/" + id + "/friends/" + auth.currentUser.uid).set(true);
  await db.ref("users/" + auth.currentUser.uid + "/friends/" + id).set(true);
  await db.ref("users/" + auth.currentUser.uid + "/friendReq/" + id).remove();
};

export const acceptMeetupReq = (meetupId) => {
  db.ref("users/" + auth.currentUser.uid + "/meetupReq/" + meetupId).remove();
  db.ref("users/" + auth.currentUser.uid + "/currentMeetups/" + meetupId).set(
    true
  );
  db.ref(
    "meetups/" + meetupId + "/imp/data/members/" + auth.currentUser.uid
  ).set("member");
};
export const giveFrndReq = (id) => {
  console.log(id);
  db.ref("users/" + id + "/friendReq/" + auth.currentUser.uid).set(true);
};

export const onMeetupreq = () => {
  console.log("onMeetupreq");

  return async (dispatch) => {
    const extractionHandler = async (snap) => {
      if (snap.val()) {
        const extraction = async (meetupkey) => {
          const data = await db
            .ref("meetups/" + meetupkey + "/imp/data")
            .once("value");
          return [meetupkey, data.val()];
        };

        const keyArray = Object.keys(snap.val());
        const extractedArray = await Promise.all(
          keyArray.map((i) => extraction(i))
        );

        dispatch({
          type: ONMEETUPREQ,
          meetupReq: extractedArray,
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
        extractionHandler(snap);
      }
    );
  };
};

export const onFrnds = () => {
  console.log("onFrnds");
  return async (dispatch) => {
    const extractionHandler = async (snap) => {
      if (snap.val()) {
        const extraction = async (key) => {
          const data = await db.ref("userlist/" + key + "/").once("value");
          return [key, data.val()];
        };
        const keyArray = Object.keys(snap.val());
        const extractedArray = await Promise.all(
          keyArray.map((i) => extraction(i))
        );
        // console.log(extractedArray);
        dispatch({
          type: ONFRNDS,
          frnds: extractedArray,
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
        extractionHandler(snap);
      }
    );
  };
};

export const onFrndReq = () => {
  console.log("onFrndReq");
  return async (dispatch) => {
    const extractionHandler = async (snap) => {
      if (snap.val()) {
        const extraction = async (key) => {
          const data = await db.ref("userlist/" + key + "/").once("value");
          return [key, data.val()];
        };
        const keyArray = Object.keys(snap.val());
        const extractedArray = await Promise.all(
          keyArray.map((i) => extraction(i))
        );
        // console.log(extractedArray);
        dispatch({
          type: ONFRNDREQ,
          frndReq: extractedArray,
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
        extractionHandler(snap);
      }
    );
  };
};

export const onCurrentMeetups = () => {
  return async (dispatch) => {
    console.log("onCurrentMeetups");

    const extractionHandler = async (snap) => {
      if (snap.val()) {
        const extraction = async (meetupkey) => {
          const data = await db
            .ref("meetups/" + meetupkey + "/imp/data")
            .once("value");
          return [meetupkey, data.val()];
        };

        const keyArray = Object.keys(snap.val());
        const extractedArray = await Promise.all(
          keyArray.map((i) => extraction(i))
        );
        // console.log(extractedArray);

        dispatch({
          type: ONCURRENTMEETUPS,
          currentMeetups: extractedArray,
        });
      } else {
        dispatch({
          type: ONCURRENTMEETUPS,
          currentMeetups: [],
        });
      }
    };
    db.ref("users/" + auth.currentUser.uid + "/currentMeetups").on(
      "value",
      (snap) => extractionHandler(snap)
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
            const searchUserList = Object.entries(snap.val());
            console.log(searchUserList);
            dispatch({ type: SEARCHUSERS, Arr: searchUserList });
          } else {
            console.log("No such User");
            dispatch({ type: SEARCHUSERS, Arr: [] });
          }
        });
    } else {
      dispatch({ type: SEARCHUSERS, Arr: [] });
    }
  };
};
