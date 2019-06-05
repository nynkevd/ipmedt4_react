import {
  CHANGE_USERNAME,
  CHANGE_LOGGEDIN,
  CHANGE_INPUTNAME,
  CHANGE_INPUTUSERNAME,
  CHANGE_INPUTEMAIL,
  CHANGE_INPUTPASSWORD,
  CHANGE_CHATKITUSER,
  CHANGE_CHECKPASSWORD,
  CHANGE_INPUTPASSWORDLOGIN,
  CHANGE_MATCHES,
 } from "./actions";

export const userName = (state="", action) =>{
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

//Registreer pagina
export const inputName = (state="", action) =>{
  switch(action.type){
    case CHANGE_INPUTNAME:
      return action.payload;
    default:
      return state;
  }
}
export const inputUserName = (state="", action) =>{
  switch(action.type){
    case CHANGE_INPUTUSERNAME:
      return action.payload;
    default:
      return state;
  }
}
export const inputEmail = (state="", action) =>{
  switch(action.type){
    case CHANGE_INPUTEMAIL:
      return action.payload;
    default:
      return state;
  }
}
export const inputPassword = (state="", action) =>{
  switch(action.type){
    case CHANGE_INPUTPASSWORD:
      return action.payload;
    default:
      return state;
  }
}
//ChatKit User
export const chatKitUser = (state=null, action) =>{
  switch(action.type){
    case CHANGE_CHATKITUSER:
      return state = action.payload;
    default:
      return state;
  }
}

//Login
export const checkPassword = (state="", action) =>{
  switch(action.type){
    case CHANGE_CHECKPASSWORD:
      return action.payload;
    default:
      return state;
  }
}
export const inputPasswordLogin = (state="", action) =>{
  switch(action.type){
    case CHANGE_INPUTPASSWORDLOGIN:
      return action.payload;
    default:
      return state;
  }
}

//Matches
export const matches = (state=[], action) =>{
  switch(action.type){
    case CHANGE_MATCHES:
      return action.payload;
    default:
      return state;
  }
}
