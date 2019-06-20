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

    console.log(roomList);

    roomList.forEach(room => {

      if(!this.props.chatKitUser.isSubscribedTo(room.id)){
        this.props.chatKitUser.subscribeToRoom({
          roomId: room.id,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.addMessageToList(message);
              //redirect of remap
              //console.log(message);
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
    //var messageList = this.props.messageList;
    //var roomId = message.roomId;

    // In object zetten:
    // this.props.changeMessageList({
    //   roomId: roomId,
    //   message: message
    // });

    //console.log(this.props.messageList);

    this.props.changeMessageList([...this.props.messageList, message]);
    // ^^ dit werkt
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
