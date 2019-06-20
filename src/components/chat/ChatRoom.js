//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeLoggedIn,
  changeChatKitUser,
  changeCurrentChatroom,
  changeMessageList,
} from "./../../actions";
//Eigen componenten importeren
import TopBarChat from '../chat/TopBarChat';
import SendMessage from '../chat/SendMessage';
import MessageList from '../chat/MessageList';

import {test} from '../chat/methodsChat.js';
//CSS importeren
import './ChatRoom.css';



class ChatRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test: "a",
    }
  }

  componentDidMount(){
    // currentUser is een object van de huidige gebruiker van chatkit
    const currentUser = this.props.chatKitUser;

  //  console.log(this.props.berichtjes[this.props.currentChatroom]);

    //console.log(this.props.currentChatroom);

    //this.filterMessages();
  }

  filterMessages = () => {
    // var messagesFiltered = this.props.messageList.filter(message =>
    //   message.roomId === this.props.currentChatroom.id
    // )
    //
    // return messagesFiltered;

    //console.log(this.state.messageList);
  }

  render(){
    return<div className="App">
          <div id="chatroom-activity">
            <TopBarChat />
            {/* roomId en currentUser worden meegegeven als variabelen, dit moet uiteindelijk met redux gedaan worden*/}
            <MessageList roomId={this.props.currentChatroom.id} currentUser={this.props.chatKitUser} currentChatroom={this.props.currentChatroom}/>
            <SendMessage />
          </div>
        </div>
  }

}

const mapStateToProps = state =>{
  return {
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    currentChatroom: state.currentChatroom,
    messageList: state.messageList,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeCurrentChatroom: changeCurrentChatroom,
  changeMessageList: changeMessageList,
})(ChatRoom);
