//React en benodigheden importeren
import React from 'react';
//Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";
//CSS importeren
import './Message.css'

const Message = (props) => {
  // De klasse wordt bepaald op basis van wie het bericht verstuurt en welke gebruiker is ingelogd
  const checkUser = () =>{
    if (props.chatKitUser.id === props.message.senderId){
      return "message--sent";
    }else{
      return "message--received";
    }
  }

  return(
    <p className={"message " + checkUser()} id={props.message.id}>{props.message.text}</p>
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
