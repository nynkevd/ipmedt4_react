//React importeren
import React from 'react';
// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";
// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';
//CSS importeren
import './TopBarChat.css';


const TopBarChat = (props) =>{
  return(
    <div className="topBarChat">
      <img className="topBarChat__img" src="./img/NS_logo.png" alt="NS Logo"/>
      <p className="topBarChat__text">{getRoomName(props.clickedChatroom, props.chatKitUser)}</p>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
})(TopBarChat);
