import React from 'react';
import { Redirect } from 'react-router-dom';
import Chatkit from '@pusher/chatkit-client';

import { connect } from "react-redux";
import {
  changeLoggedIn,
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";

import TopBar from '../layout/TopBar';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

import './ChatRoom.css';

class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {messageList: []}
  }

  componentDidMount(){
    const currentUser = this.props.chatKitUser;
    console.log(this.props.chatKitUser);
    console.log(this.props.clickedChatroom);

    // Alleen als de gebruiker is ingelogd kan hij naar de chatroom
    if(currentUser != null){
      currentUser.subscribeToRoom({
        roomId: this.props.clickedChatroom,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            // console.log("New message: ", message.text);
            // console.log(message);
            this.setState({
               messageList: [...this.state.messageList, message],
             });
          }
        }
      })
    }

  }

  render(){
    return this.props.loggedIn
      ?<div className="App">
          <div id="chatroom-scherm">
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
