import { CHANGE_USERNAME, CHANGE_LOGGEDIN } from "./actions";

export const username = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERNAME:
      return action.payload;
    default:
      return state;
  }
}

export const loggedIn = (state=false, action) =>{
  switch(action.type){
    case CHANGE_LOGGEDIN:
      return action.payload;
    default:
      return state;
  }
}
