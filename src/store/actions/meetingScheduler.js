import * as actionTypes from "./actionTypes";

export const saveMeetingStart = () => {
  return {
    type: actionTypes.SAVE_MEETING_START
  };
};

export const saveMeetingSuccess = (meetingData) => {
  return {
    type: actionTypes.SAVE_MEETING_SUCCESS,
    meetingData
  };
};

export const saveMeeting = (meetingData, history) => (dispatch) => {
  dispatch(saveMeetingStart());
  dispatch(saveMeetingSuccess(meetingData));
  history.push("/dashboard");
};

export const saveMeetingFail = (error) => {
  return {
    type: actionTypes.SAVE_MEETING_FAIL,
    error: error
  };
};

export const fetchMeeting = (date) => {
  return {
    type: actionTypes.FETCH_MEETING,
    date
  };
};
