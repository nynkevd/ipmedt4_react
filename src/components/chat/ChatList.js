//React en benodigheden importeren
import React from 'react';
import { Link } from 'react-router-dom'
//Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import ChatRoomCard from '../chat/ChatRoomCard'
//CSS importeren
import './ChatList.css';

var roomList = [];

class ChatList extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      chatList: [],
    })
  }

  componentDidMount(){
    this.mapRooms();
  }


  getRooms = () => {
    if(this.props.chatKitUser !== null){
      roomList = this.props.chatKitUser.rooms;

      //Bij het sorteren van de rooms wordt rekening gehouden met de rooms die nog geen berichten hebben. Deze worden gesorteerd op basis van de datum en tijd waarop ze aangemaakt zijn.
      roomList.sort((a, b) => {
        var aLastMessage = a.lastMessageAt;
        var bLastMessage = b.lastMessageAt;
        var aCreated = a.createdAt;
        var bCreated = b.createdAt;

        if(aLastMessage === undefined){
          if(aCreated < bLastMessage) return 1;
          if(aCreated > bLastMessage) return -1;
        }

        if(bLastMessage === undefined){
          if(aLastMessage < bCreated) return 1;
          if(aLastMessage > bCreated) return -1;
        }

        if(aLastMessage === undefined && bLastMessage === undefined){
          if(aCreated < bCreated) return 1;
          if(aCreated > bCreated) return -1;
        }

        if(aLastMessage < bLastMessage) return 1;
        if(aLastMessage > bLastMessage) return -1;
      });
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
        { roomList.length > 0 ?
            <ul>
              {
                this.state.chatList
              }
            </ul>
          :
          <div>
            <p className="chatPageContainer__noChats">Je hebt geen chats</p>
            <Link to="/friendsList">
              <img className="chatPageContainer__noChats__logo"src="./img/logoSadChat.svg" alt="Travel Buddy Sad Logo"/>
              </Link>
          </div>
        }
        </div>
        <BottomNav />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(ChatList);
