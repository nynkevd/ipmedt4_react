//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import ChatRoomCard from '../chat/ChatRoomCard'
//CSS importeren
import './Chat.css';

const Chat = props => {
  // roomExists is een array van alle rooms die bestaan
  const roomExists = props.chatKitUser.rooms;
  console.log(roomExists);

    return props.loggedIn
      ? <div>
        <TopBar />
        <div className="chatPageContainer">
          <h1>Chat</h1>
          <ul>
            {
              roomExists.map((room, index) =>
              <li>
                <ChatRoomCard room={room} className="roomCard" id={index} key={index} index={index}/>
              </li>
              )
            }
          </ul>
        </div>
        <BottomNav />
      </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
})(Chat);
