//React en benodigheden importeren
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeMessageList,
  changeCurrentChatroom,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import ChatRoomCard from '../chat/ChatRoomCard'
//CSS importeren
import './Chat.css';

class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      chatList: [],
    })
  }

  componentDidMount(){
    console.log(this.props.currentChatroom);
    this.subscribeToRooms();
    this.mapRooms();
  }

  subscribeToRooms= () => {
    var roomList = this.getRooms();

    roomList.forEach(room => {
      if(!this.props.chatKitUser.isSubscribedTo(room.id)){
        this.props.chatKitUser.subscribeToRoom({
          roomId: room.id,
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              console.log("nieuw bericht: " + message.text);
              this.props.changeMessageList(message);

              console.log(this.props.currentChatroom);

              if(this.props.currentChatroom === []){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
                this.mapRooms();
              }

            }
          }
        })
      }
    })
  }

  getRooms = () => {
    var roomList = [];

    if(this.props.currentUser !== null){
      roomList = this.props.chatKitUser.rooms;

      roomList.sort((a, b) => (a.lastMessageAt < b.lastMessageAt)? 1 : -1);
    }

    return roomList;
  }

  mapRooms = () => {
    var rooms = this.getRooms();

    var mappedRooms = (
      rooms.map((room, index) =>
        <li key={index} >
          <ChatRoomCard room={room} className="roomCard" id={index} index={index}/>
        </li>
    ));

    this.setState({
      chatList: mappedRooms,
    })

  }

  render(){
    return (this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="chatPageContainer">
          <ul>
            {
              this.state.chatList
            }
          </ul>
        </div>
        <BottomNav />
      </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
    )
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    messageList: state.messageList,
    currentChatroom: state.currentChatroom,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeMessageList: changeMessageList,
  changeCurrentChatroom: changeCurrentChatroom,
})(Chat);
