export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_LOGGEDIN = "CHANGE_LOGGEDIN";

export const changeUserName = username =>({
  type: CHANGE_USERNAME,
  payload: username,
});

export const changeLoggedIn = loggedIn =>({
  type: CHANGE_LOGGEDIN,
  payload: loggedIn,
});
