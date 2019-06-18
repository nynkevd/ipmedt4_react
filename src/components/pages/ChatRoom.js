//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeLoggedIn,
  changeChatKitUser,
  changeChatroomClicked,
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

    //this.filterMessages();
  }

  filterMessages = () => {
    var messagesFiltered = this.props.messageList.filter(message =>
      message.roomId == this.props.clickedChatroom.id
    )

    return messagesFiltered;

    //console.log(this.state.messageList);
  }

  render(){
    return this.props.loggedIn
      ?<div className="App">
          <div id="chatroom-activity">
            <TopBarChat />
            {/* roomId en currentUser worden meegegeven als variabelen, dit moet uiteindelijk met redux gedaan worden*/}
            <MessageList messageList={this.props.messageList} roomId={this.props.clickedChatroom.id} currentUser={this.props.chatKitUser} clickedChatroom={this.props.clickedChatroom}/>
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
    messageList: state.messageList,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
  changeMessageList: changeMessageList,
})(ChatRoom);
