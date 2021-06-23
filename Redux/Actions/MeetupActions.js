import { Alert } from "react-native";
import { db, auth } from "../../Service/FirebaseConfig";
export const MEETUPID = "MEETUPID";
export const ONPROGRAMS = "ONPROGRAMS";
export const ONMEETUPDATA = "ONMEETUPDATA";
export const CLEANINGMEETUPTABS = "CLEANINGMEETUPTABS";
export const ONPICS = "ONPICS";
export const ONMESSAGES = "ONMESSAGES";
export const UPDATEENDDATEHANDLER = "UPDATEENDDATEHANDLER";
export const UPDATEMEETUPDATEHANDLER = "UPDATEMEETUPDATEHANDLER";

export const upMeetupDateHandler = async (meetupId, date) => {
  console.log("upMeetupdateHandler");
  db.ref("meetups/" + meetupId + "/imp/data/meetupDate").set(date);
  const mem = await db
    .ref("meetups/" + meetupId + "/imp/data/members")
    .once("value");
  const memkeys = Object.keys(mem.val());
  // console.log(memkeys);

  memkeys.forEach((key) => {
    const ref = db.ref("users/" + key + "/currentMeetups/" + meetupId);
    ref.transaction(function (value) {
      if (value === true) {
        return false;
      } else {
        return true;
      }
    });
  });
};

export const updateEndDateHandler = async (meetupId, date) => {
  console.log("updateEndHandler");
  db.ref("meetups/" + meetupId + "/imp/data/endDate").set(date);
  const mem = await db
    .ref("meetups/" + meetupId + "/imp/data/members")
    .once("value");
  const memkeys = Object.keys(mem.val());
  // console.log(memkeys);

  memkeys.forEach((key) => {
    const ref = db.ref("users/" + key + "/currentMeetups/" + meetupId);
    ref.transaction(function (value) {
      if (value === true) {
        return false;
      } else {
        return true;
      }
    });
  });
};

export const unsettleHandler = (meetupId, programId) => {
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
export const onMeetupData = (meetupId) => {
  return async (dispatch) => {
    console.log("onMeetupData");

    const extractionHandler = async (snap) => {
      if (snap.val()) {
        const extraction = async (uid, power) => {
          const data = await db.ref("userlist/" + uid).once("value");
          const forIncludingPower = data.val();
          forIncludingPower.power = power;
          return [uid, forIncludingPower];
        };

        let finalData = snap.val();

        const keyArray = Object.entries(snap.val().members);
        const extractedArray = await Promise.all(
          keyArray.map((aMember) => extraction(aMember[0], aMember[1]))
        );

        finalData.members = extractedArray;
        // console.log(finalData);
        // console.log(extractedArray);

        dispatch({
          type: ONMEETUPDATA,
          data: finalData,
        });
      } else {
        dispatch({
          type: ONMEETUPDATA,
          data: [],
        });
      }
    };
    db.ref("meetups/" + meetupId + "/imp/data").on("value", (snap) =>
      extractionHandler(snap)
    );
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

    n.navigate("MeetupTabsStackScreens");
  };
};
export const joinMeetup = (id, props) => {
  return async (dispatch) => {
    db.ref("meetuplist/" + id).once("value", (snap) => {
      // console.log(snap);
      if (snap.val()) {
        db.ref("users/" + auth.currentUser.uid + "/currentMeetups/" + id).set(
          true
        );

        db.ref("meetups/" + id + "/imp/data/members/" + auth.currentUser.uid)
          .set(true)
          .then(() => {
            dispatch({ type: MEETUPID, meetupId: id });
            props.handler();

            props.navigation.navigate("MeetupTabsStackScreens");
          });
      } else {
        Alert.alert("Enter Valid Meetup Id");
      }
    });
  };
};
export const createMeetup = (meetupName, props) => {
  function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const today = new Date();
  const meetupDate = addDays(today, 15);
  const endDate = addDays(today, 17);

  const meetupDateReady =
    meetupDate.getDate() +
    "-" +
    (meetupDate.getMonth() + 1) +
    "-" +
    meetupDate.getFullYear();
  const endDateReady =
    endDate.getDate() +
    "-" +
    (endDate.getMonth() + 1) +
    "-" +
    endDate.getFullYear();

  return async (dispatch) => {
    db.ref("meetups/")
      .push({
        imp: {
          data: {
            endDate: endDateReady,
            meetupDate: meetupDateReady,
            meetupName: meetupName,
            members: {
              [auth.currentUser.uid]: "admin",
            },
          },
        },
      })
      .then((snap) => {
        // console.log(snap.key);
        db.ref("meetuplist/" + snap.key).set(true);

        db.ref(
          "users/" + auth.currentUser.uid + "/currentMeetups/" + snap.key
        ).set(true);
        dispatch({ type: MEETUPID, meetupId: snap.key });

        props.handler();

        props.navigation.navigate("MeetupTabsStackScreens");
      });
  };
};
export const giveMeetupReq = (toFrnd, meetupId) => {
  db.ref("users/" + toFrnd + "/meetupReq/" + meetupId).set(true);
};
