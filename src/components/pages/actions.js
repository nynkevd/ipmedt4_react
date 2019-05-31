const CHANGE_USERNAME = "CHANGE_USERNAME";

export const changeUserName = username =>({
  type:CHANGE_USERNAME,
  payload: username,
});
