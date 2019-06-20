//React en benodigheden importeren
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeCurrentChatroom,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import ChatRoomCard from '../chat/ChatRoomCard'
//CSS importeren
import './ChatList.css';

class ChatList extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      chatList: [],
    })
  }

  componentDidMount(){
    // console.log(this.props.currentChatroom);
    // this.subscribeToRooms();
    this.mapRooms();
  }

  getRooms = () => {
    var roomList = [];

    if(this.props.chatKitUser !== null){
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
    return (<div>
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

    )
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    currentChatroom: state.currentChatroom,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
})(ChatList);
