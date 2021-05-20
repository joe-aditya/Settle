import { Alert } from "react-native";
import { db, auth } from "../../Service/FirebaseConfig";

export const MEETUPID = "MEETUPID";
export const ONPROGRAMS = "ONPROGRAMS";
export const ONDATA = "ONDATA";
export const CLEANINGMEETUPTABS = "CLEANINGMEETUPTABS";
export const ONPICS = "ONPICS";
export const ONMESSAGES = "ONMESSAGES";

export const unsettleHandler = (meetupId, programId) => {
  console.log(meetupId);
  db.ref("meetups/" + meetupId + "/programs/" + programId).update({
    status: "Settle",
    Final: "",
  });
};
export const editProgramHandler = (meetupId, x, programId) => {
  console.log("editProgram");
  db.ref("meetups/" + meetupId + "/programs/" + programId).set(x);
};
export const handleSettle = (meetupId, programId, activityName) => {
  db.ref("meetups/" + meetupId + "/programs/" + programId).update({
    status: "Settled",
    Final: activityName,
  });
};
export const handleLike = (meetupId, programId, activityName) => {
  db.ref(
    "meetups/" +
      meetupId +
      "/programs/" +
      programId +
      "/catagories/" +
      activityName +
      "/" +
      auth.currentUser.uid
  ).set(true);
  // ).transaction((currentCount) => {
  //   return (currentCount || 0) + 1;
  // });
};
export const createProgram = (meetupId, x) => {
  console.log("createProgram");
  db.ref("meetups/" + meetupId + "/programs/").push(x);
};
export const onMessages = (id) => {
  return async (dispatch) => {
    const handleNewMessages = (snap) => {
      dispatch({ type: ONMESSAGES, message: snap.val() });
    };
    db.ref("meetups/" + id + "/messages/").on("child_added", handleNewMessages);
  };
};
export const onPics = (pics) => {
  return (dispatch) => {
    dispatch({
      type: ONPICS,
      pics,
    });
  };
};

export const cleaningMeetupTabs = (meetupId) => {
  return (dispatch) => {
    console.log("cleaningMeetupTabs");
    db.ref("meetups/" + meetupId + "/")
      .child("programs")
      .off("value");
    db.ref("meetups/" + meetupId + "/")
      .child("data")
      .off("value");

    db.ref("meetups/" + meetupId + "/messages/").off("child_added");
    dispatch({ type: CLEANINGMEETUPTABS });
  };
};
export const onData = (meetupId) => {
  return async (dispatch) => {
    console.log("onData");

    const g = async (snap) => {
      if (snap.val()) {
        const extraction = async (uid) => {
          const data = await db.ref("userlist/" + uid).once("value");
          return [uid, data.val()];
        };
        let finalData = snap.val();

        const a1 = Object.keys(snap.val().members);
        const a2 = await Promise.all(a1.map((i) => extraction(i)));
        finalData.members = a2;
        // console.log(finalData);
        // console.log(a2);

        dispatch({
          type: ONDATA,
          data: finalData,
        });
      } else {
        dispatch({
          type: ONDATA,
          data: [],
        });
      }
    };
    db.ref("meetups/" + meetupId + "/")
      .child("data")
      .on("value", (snap) => g(snap));
  };
};

export const onPrograms = (id) => {
  return (dispatch) => {
    db.ref("meetups/" + id + "/")
      .child("programs")
      .on("value", (snap) => {
        if (snap.val())
          dispatch({
            type: ONPROGRAMS,
            programs: Object.entries(snap.val()),
          });
        else {
          dispatch({
            type: ONPROGRAMS,
            programs: [],
          });
        }
      });
  };
};

export const enterMeetup = (id, n) => {
  return (dispatch) => {
    dispatch({ type: MEETUPID, meetupId: id });
    
    n.navigate("MeetupTabs");
  };
};
export const joinMeetup = (id, props) => {
  return async (dispatch) => {
    db.ref("meetuplist/" + id).once("value", (snap) => {
      // console.log(snap);
      if (snap.val()) {
        db.ref("users/" + auth.currentUser.uid + "/currentRooms/" + id).set(
          true
        );

        db.ref("meetups/" + id + "/data/members/" + auth.currentUser.uid)
          .set(true)
          .then(() => {
            dispatch({ type: MEETUPID, meetupId: id });
            props.handler();

            props.navigation.navigate("MeetupTabs");
          });
      } else {
        Alert.alert("Enter Valid Meetup Id");
      }
    });
  };
};
export const createMeetup = (meetupName, props) => {
  return async (dispatch) => {
    db.ref("meetups/")
      .push({
        data: {
          meetupName: meetupName,
          members: {
            [auth.currentUser.uid]: true,
          },
        },
      })
      .then((snap) => {
        // console.log(snap.key);
        db.ref("meetuplist/" + snap.key).set(true);

        db.ref(
          "users/" + auth.currentUser.uid + "/currentRooms/" + snap.key
        ).set(true);
        dispatch({ type: MEETUPID, meetupId: snap.key });

        props.handler();

        props.navigation.navigate("MeetupTabs");
      });
  };
};
export const giveMeetupReq = (toFrnd, meetupId) => {
  db.ref("users/" + toFrnd + "/meetupReq/" + meetupId).set(true);
};
