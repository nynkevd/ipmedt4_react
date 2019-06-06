import React from 'react';

import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";

import './Message.css'

const Message = (props) => {
  const checkUser = () =>{
    if (props.chatKitUser.id === props.message.senderId){
      return "message--sent";
    }else{
      return "message--received";
    }
  }

  return(
    <div className={"message " + checkUser()} id={props.message.id}>{props.message.text}</div>
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
