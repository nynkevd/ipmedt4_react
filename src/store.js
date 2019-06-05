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
  })
)
