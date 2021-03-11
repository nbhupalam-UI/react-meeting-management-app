import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    fetch("users.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function ({ users }) {
        const [user] = users.filter(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("userId", email);
          dispatch(authSuccess(user.token, email));
        } else {
          dispatch(authFail({ message: "Invalid username or password" }));
        }
      })
      .catch((err) => {
        dispatch(authFail({ message: "Invalid username or password" }));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId));
    }
  };
};
