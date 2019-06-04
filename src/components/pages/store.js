import { combineReducers, createStore } from "redux";
import { username, loggedIn } from "./reducer";

export const store = createStore(
  combineReducers({
    username,
    loggedIn,
  })
)
