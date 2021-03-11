import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  error: null,
  loading: false,
  meetingDetails: null,
  meetingsList: []
};

const handleStart = (state) => {
  return updateObject(state, {
    error: null,
    loading: true,
    meetingDetails: null
  });
};

const handleSuccess = ({ meetingsList }, { meetingData }) => {
  let updatedState = {
    error: null,
    loading: false,
    meetingDetails: null
  };
  let updatedList = [];
  const index = meetingsList.findIndex((f) => f.date === meetingData.date);
  if (index !== -1) {
    updatedList = meetingsList.map((item, i) => {
      if (index !== i) {
        return item;
      }

      return updateObject(item, meetingData);
    });
  } else {
    updatedList = meetingsList.concat(meetingData);
  }
  updatedState.meetingsList = updatedList;
  return updatedState;
};

const handleFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    meetingDetails: null
  });
};

const fetchMeetingDetails = (state, { date }) => {
  let meetingDetails = state.meetingsList.filter(
    (meeting) => meeting.date === date
  )[0];
  if (!meetingDetails) {
    meetingDetails = {
      date,
      name: "",
      description: "",
      attendeesList: []
    };
  }
  return updateObject(state, {
    meetingDetails
  });
};

const handleLogout = (state) => {
  return updateObject(state, initialState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_MEETING_START:
      return handleStart(state, action);
    case actionTypes.SAVE_MEETING_SUCCESS:
      return handleSuccess(state, action);
    case actionTypes.SAVE_MEETING_FAIL:
      return handleFail(state, action);
    case actionTypes.FETCH_MEETING:
      return fetchMeetingDetails(state, action);
    case actionTypes.AUTH_LOGOUT:
      return handleLogout(state);
    default:
      return state;
  }
};

export default reducer;
