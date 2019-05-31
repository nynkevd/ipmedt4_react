import "./actions";

const CHANGE_USERNAME = "CHANGE_USERNAME";

export const username = (state="", action) =>{
  switch(action.type){
    case CHANGE_USERNAME:
      return action.payload;
    default:
      return state;
  }
}
