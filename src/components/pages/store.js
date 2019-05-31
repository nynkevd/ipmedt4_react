import {combineReducers, createStore} from "redux";
import {username} from "./reducer";

export const store = createStore(
  combineReducers({
    username
  })
)
