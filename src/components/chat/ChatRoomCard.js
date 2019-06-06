import React from 'react';
import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";
import { Link } from 'react-router-dom';

const ChatRoomCard = (props) => {

  const onClick = () => {
    const currentUser = props.chatKitUser;
    const rooms = currentUser.rooms;
    const selectedUser = "nynke";//props.user.toLowerCase();
    const roomName = currentUser.id + "_" + selectedUser;
    const users = [selectedUser, currentUser.id];

    if(checkIfRoomExists(rooms, users)){
      console.log("room bestaat");
      // join de room
      currentUser.subscribeToRoom({
        roomId: '31224101',
        hooks: {
          onMessage: message => {
            console.log("New message: ", message.text);
          }
        }
      })
      // Ga naar de chat pagina
    }else{
      console.log("room bestaat niet");
      createRoom(currentUser, roomName, selectedUser);
      // En join de room
      // Ga naar de chat pagina
    }
  }

  const checkIfRoomExists = (rooms, users) => {
    var bestaat = false
    rooms.forEach(function(room){
      if(room.customData && room.customData.isDirectMessage){
        const roomUsers = room.customData.userIds;
        if(roomUsers.sort().join('') === users.sort().join('')){
          bestaat = true;
        }
      }
    });

    return bestaat;
  }

  const createRoom = (currentUser, roomName, selectedUser) => {
    currentUser.createRoom({
      name: roomName,
      private: true,
      addUserIds: [selectedUser],
      customData: {
        isDirectMessage: true,
        userIds: [currentUser.id, selectedUser]
      }
    })
  }

  return(
    <div>
    <Link to='/tempChatRoom'>
      <div onClick={onClick}>
        <h3>Username</h3>
        <div>Last message (?)</div>
      </div>
    </Link>
    </div>
    );
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(ChatRoomCard);
