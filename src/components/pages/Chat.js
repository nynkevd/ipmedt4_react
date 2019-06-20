//React en benodigheden importeren
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeLoggedIn,
  changeCurrentChatroom,
  changeChatKitUser,
  changeMessageList,
} from "./../../actions";
//Eigen componenten importeren
import ChatList from './../chat/ChatList';
import ChatRoom from './../chat/ChatRoom';
import ChatRoomCard from './../chat/ChatRoomCard';
//CSS importeren

class Chat extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.changeMessageList([]);
    this.subscribeToRooms();
  }

  subscribeToRooms= () => {
    var roomList = this.getRooms();
    
    roomList.forEach(room => {

      if(!this.props.chatKitUser.isSubscribedTo(room.id)){
        this.props.chatKitUser.subscribeToRoom({
          roomId: room.id,
          messageLimit: 50,
          hooks: {
            onMessage: message => {
              this.addMessageToList(message);
            }
          }
        })
      }
    })
  }

  getRooms = () => {
    var roomList = [];

    if(this.props.chatKitUser !== null){
      roomList = this.props.chatKitUser.rooms;

      roomList.sort((a, b) => (a.lastMessageAt < b.lastMessageAt)? 1 : -1);
    }

    return roomList;
  }

  addMessageToList = (message) => {
    this.props.changeMessageList(message);
  }

  render(){
    return(
      this.props.loggedIn
      ? this.props.currentChatroom === ""
        ? <ChatList />
        : <ChatRoom />
      : <Redirect to="/login" />
    );
  }

}

const mapStateToProps = state =>{
  return {
    loggedIn: state.loggedIn,
    currentChatroom: state.currentChatroom,
    chatKitUser: state.chatKitUser,
    messageList: state.messageList,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
  changeMessageList: changeMessageList,
})(Chat);
