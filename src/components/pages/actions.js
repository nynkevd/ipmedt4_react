export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const CHANGE_LOGGEDIN = "CHANGE_LOGGEDIN";
export const CHANGE_INPUTNAME = "CHANGE_INPUTNAME";
export const CHANGE_INPUTUSERNAME= "CHANGE_INPUTUSERNAME";
export const CHANGE_INPUTEMAIL = "CHANGE_INPUTEMAIL";
export const CHANGE_INPUTPASSWORD = "CHANGE_INPUTPASSWORD";


//login
export const changeUserName = userName =>({
  type: CHANGE_USERNAME,
  payload: userName,
});
//boolean controle loggedin
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
