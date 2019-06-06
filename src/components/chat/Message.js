import React from 'react';

import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";

const Message = (props) => {
  const checkUser = () =>{
    if (props.chatKitUser.id === props.message.senderId){
      return "message message--sent";
    }else{
      return "message";
    }
  }

  return(
    <li class={checkUser()}>{props.message.text}</li>
  )
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(Message);
