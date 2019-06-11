//React importeren
import React from 'react';
<<<<<<< HEAD

=======
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";
// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';
>>>>>>> dev
//CSS importeren
import './TopBarChat.css';


const TopBarChat = (props) =>{
  return(
    <div className="topBarChat">
      <Link to='/chat' className="chatCardLink">
      <img className="topBarChat__back" src="./img/icons/arrow_back.svg" alt="Terug"/>
      </Link>
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
