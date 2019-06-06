import { combineReducers, createStore } from "redux";
import {
  userName,
  loggedIn,
  inputName,
  inputUserName,
  inputEmail,
  inputPassword,
  chatKitUser,
  checkPassword,
  inputPasswordLogin,
  matches,
  userInterests,
  userProfilePicture,
  userTravelFrom,
  userTravelTo,
  userDisplayName,
  profilePictureList,
  clickedChatroom,
  } from "./reducer";

export const store = createStore(
  combineReducers({
    userName,
    loggedIn,
    inputName,
    inputUserName,
    inputEmail,
    inputPassword,
    chatKitUser,
    checkPassword,
    inputPasswordLogin,
    matches,
    userInterests,
    userProfilePicture,
    userTravelFrom,
    userTravelTo,
    userDisplayName,
    profilePictureList,
    clickedChatroom,
  })
)
