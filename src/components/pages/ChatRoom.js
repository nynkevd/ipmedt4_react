//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
import Chatkit from '@pusher/chatkit-client';
//Redux importeren
import { connect } from "react-redux";
import {
  changeLoggedIn,
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";
//Eigen componenten importeren
import TopBarChat from '../chat/TopBarChat';
import SendMessage from '../chat/SendMessage';
import MessageList from '../chat/MessageList';
//CSS importeren
import './ChatRoom.css';

class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {messageList: []}
  }

  componentDidMount(){
    // currentUser is een object van de huidige gebruiker van chatkit
    const currentUser = this.props.chatKitUser;

    // Alleen als de gebruiker is ingelogd kan hij naar verschillende chatrooms
    if(currentUser != null){
      this.subscribeToChatroom(currentUser);
    }
  }

  // Functie om de huidige gebruiker aan de chat deel te laten nemen
  subscribeToChatroom = (currentUser) => {
    // subscribeToRoom is een functie van ChatKit om aan een room deel te nemen
    currentUser.subscribeToRoom({
      roomId: this.props.clickedChatroom,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
             messageList: [...this.state.messageList, message],
           });
        }
      }
    })
  }

  render(){
    return this.props.loggedIn
      ?<div className="App">
          <div id="chatroom-activity">
            <TopBarChat />
            <MessageList messageList={this.state.messageList} />
            <SendMessage />
          </div>
        </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
  }

}

const mapStateToProps = state =>{
  return {
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
})(ChatRoom);
