export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_LOGGEDIN = "CHANGE_LOGGEDIN";
export const CHANGE_INPUTNAME = "CHANGE_INPUTNAME";
export const CHANGE_INPUTUSERNAME= "CHANGE_INPUTUSERNAME";
export const CHANGE_INPUTEMAIL = "CHANGE_INPUTEMAIL";
export const CHANGE_INPUTPASSWORD = "CHANGE_INPUTPASSWORD";
export const CHANGE_CHATKITUSER = "CHANGE_CHATKITUSER";
export const CHANGE_CHECKPASSWORD = "CHANGE_CHECKPASSWORD";
export const CHANGE_INPUTPASSWORDLOGIN = "CHANGE_INPUTPASSWORDLOGIN";
export const CHANGE_MATCHES = "CHANGE_MATCHES";
export const CHANGE_USERINTERESTS = "CHANGE_USERINTERESTS";
export const CHANGE_USERPROFILEPICTURE = "CHANGE_USERPROFILEPICTURE";
export const CHANGE_USERTRAVELFROM = "CHANGE_USERTRAVELFROM";
export const CHANGE_USERTRAVELTO = "CHANGE_USERTRAVELTO";
export const CHANGE_USERDISPLAYNAME = "CHANGE_USERDISPLAYNAME";
export const CHANGE_PROFILEPICTURELIST = "CHANGE_PROFILEPICTURELIST";

//Username van de ingelogde gebruiker
export const changeUserName = userName =>({
  type: CHANGE_USERNAME,
  payload: userName,
});

//Boolean die bijhoudt of er ingelogd is
export const changeLoggedIn = loggedIn =>({
  type: CHANGE_LOGGEDIN,
  payload: loggedIn,
});

// Registreer pagina
export const changeInputName = inputName =>({
  type: CHANGE_INPUTNAME,
  payload: inputName,
});

export const changeInputUserName = inputUserName =>({
  type: CHANGE_INPUTUSERNAME,
  payload: inputUserName,
});

export const changeInputEmail = inputEmail =>({
  type: CHANGE_INPUTEMAIL,
  payload: inputEmail,
});

export const changeInputPassword = inputPassword =>({
  type: CHANGE_INPUTPASSWORD,
  payload: inputPassword,
});

//ChatKit User
export const changeChatKitUser = chatKitUser =>({
  type: CHANGE_CHATKITUSER,
  payload: chatKitUser,
});

//Login pagina
export const changeCheckPassword = checkPassword =>({
  type: CHANGE_CHECKPASSWORD,
  payload: checkPassword,
})
export const changeInputPasswordLogin = inputPasswordLogin =>({
  type: CHANGE_INPUTPASSWORDLOGIN,
  payload: inputPasswordLogin,
})

//Matches
export const changeMatches = matches =>({
  type: CHANGE_MATCHES,
  payload: matches,
})

//Account pagina
export const changeUserInterests = userInterests =>({
  type: CHANGE_USERINTERESTS,
  payload: userInterests,
})

export const changeUserProfilePicture = userProfilePicture =>({
  type: CHANGE_USERPROFILEPICTURE,
  payload: userProfilePicture,
})

export const changeUserTravelFrom = userTravelFrom =>({
  type: CHANGE_USERTRAVELFROM,
  payload: userTravelFrom,
})

export const changeUserTravelTo = userTravelTo =>({
  type: CHANGE_USERTRAVELTO,
  payload: userTravelTo,
})

export const changeUserDisplayName = userDisplayName =>({
  type: CHANGE_USERDISPLAYNAME,
  payload: userDisplayName,
})

//Accoutedit pagina
export const changeProfilePictureList = profilePictureList =>({
  type: CHANGE_PROFILEPICTURELIST,
  payload: profilePictureList,
})
