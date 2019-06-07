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
  var roomExists = []; //Als de gebruiker niet is ingelogd zorgt het voor een error als er geen roomExists bestaat

  // roomExists is een array van alle rooms die bestaan
  if(props.chatKitUser !== null){
    roomExists = props.chatKitUser.rooms;
    //sorteer de lijst van rooms op basis van het tijdstip van het bericht
    roomExists.sort((a, b) => (a.lastMessageAt < b.lastMessageAt)? 1 : -1);
  }

  return props.loggedIn
    ? <div>
      <TopBar />
      <div className="chatPageContainer">
        <ul>
          {
            roomExists.map((room, index) =>
            <li key={index} >
              <ChatRoomCard room={room} className="roomCard" id={index} index={index}/>
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
