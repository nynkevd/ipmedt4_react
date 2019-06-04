import { combineReducers, createStore } from "redux";
import {
  userName,
  loggedIn,
  inputName,
  inputUserName,
  inputEmail,
  inputPassword
  } from "./reducer";

export const store = createStore(
  combineReducers({
    userName,
    loggedIn,
    inputName,
    inputUserName,
    inputEmail,
    inputPassword
  })
)
