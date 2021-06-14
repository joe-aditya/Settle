import {
  MEETUPID,
  ONMEETUPDATA,
  ONPICS,
  ONPROGRAMS,
  CLEANINGMEETUPTABS,
  ONMESSAGES,
} from "../Actions/MeetupActions";

const initialState = {
  isLoaded: { programState: false, dataState: false },
  meetupId: "",
  data: {
    meetupName: "",
    members: [],
    description: "",
    meetupPic: "",
    endDate: "",
    meetupDate: "",
  },
  programs: [],
  others: [],
  messages: [],
  pics: [],
};

const MeetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEETUPID:
      return {
        ...state,
        meetupId: action.meetupId,
      };
    case ONMESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case CLEANINGMEETUPTABS:
      return {
        ...initialState,
      };
    case ONPROGRAMS:
      return {
        ...state,
        programs: action.programs,
        isLoaded: { ...state.isLoaded, programState: true },
      };
    case ONMEETUPDATA:
      return {
        ...state,
        data: {
          meetupName: action.data.meetupName,
          members: action.data.members,
          meetupPic: action.data.meetupPic ? action.data.meetupPic : "",
          description: action.data.description ? action.data.description : "",
          endDate: action.data.endDate ? action.data.endDate : "",
          meetupDate: action.data.meetupDate ? action.data.meetupDate : "",
        },
        isLoaded: { ...state.isLoaded, dataState: true },
      };
    case ONPICS:
      return {
        ...state,
        pics: action.pics,
      };
    default:
      return state;
  }
};

export default MeetupReducer;
