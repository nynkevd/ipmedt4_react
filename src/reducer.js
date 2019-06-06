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
  CHANGE_USERINTERESTS,
  CHANGE_USERPROFILEPICTURE,
  CHANGE_USERTRAVELFROM,
  CHANGE_USERTRAVELTO,
  CHANGE_USERDISPLAYNAME,
  CHANGE_CHATROOMCLICKED,
 } from "./actions";

//Username van de ingelogde gebruiker veranderen
export const userName = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERNAME:
      return action.payload;
    default:
      return state;
  }
}

//Bijhouden in een boolean of er ingelogd is
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

//Login pagina
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

//Account pagina
export const userInterests = (state=[], action) =>{
  switch(action.type){
    case CHANGE_USERINTERESTS:
      return action.payload;
    default:
      return state;
  }
}

export const userProfilePicture = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERPROFILEPICTURE:
      return action.payload;
    default:
      return state;
  }
}

export const userTravelFrom = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERTRAVELFROM:
      return action.payload;
    default:
      return state;
  }
}

export const userTravelTo = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERTRAVELTO:
      return action.payload;
    default:
      return state;
  }
}

export const userDisplayName = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERDISPLAYNAME:
      return action.payload;
    default:
      return state;
  }
}

// ChatroomCard pagina
export const clickedChatroom = (state="", action) =>{
  switch(action.type){
    case CHANGE_CHATROOMCLICKED:
      return action.payload;
    default:
      return state;
  }
}
