// React importeren
import React from 'react';

// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
  changeChatroomClicked,
} from './../../actions';

class ChatButton extends React.Component{
  constructor(props){
    super(props);

  }

  onClick = event => {
    console.log("onclick");
    const currentUser = this.props.chatKitUser;
    const rooms = currentUser.rooms;
    const selectedUser = this.props.chosenFriend.toLowerCase();//props.user.toLowerCase();
    const roomName = currentUser.id + "_" + selectedUser;
    const users = [selectedUser, currentUser.id];
    var messageList = [];

    if(!this.checkIfRoomExists(rooms, users)){
      this.createRoom(currentUser, roomName, selectedUser);
      console.log("Room aangemaakt");
      currentUser.subscribeToRoom();
      console.log("In de room");
    }else{
      console.log("Naar room gaan");
      currentUser.subscribeToRoom();
      console.log("In de room");
    }
  }

  // {testfunction = (room) => {
  //   this.props.changeChatroomClicked(room);
  // }

  checkIfRoomExists = (rooms, users) => {
    var exists = false
    rooms.forEach(function(room){
      if(room.customData && room.customData.isDirectMessage){
        const roomUsers = room.customData.userIds;
        console.log(rooms);
        if(roomUsers.sort().join('') === users.sort().join('')){
          console.log(room);
          exists = true;
          // this.testfunction(room);
          this.props.changeChatroomClicked(room);
        }
      }
    });

    return exists;
  }

  createRoom = (currentUser, roomName, selectedUser) => {
    console.log(selectedUser);
    currentUser.createRoom({
      name: roomName,
      private: true,
      addUserIds: [selectedUser],
      customData: {
        isDirectMessage: true,
        userIds: [currentUser.id, selectedUser]
      }
    }).then(room=> {
      this.props.changeChatroomClicked(room);
    });
  }

  subscribeToChatroom = (currentUser) => {
    console.log("In room");
      // subscribeToRoom is een functie van ChatKit om aan een room deel te nemen
      currentUser.subscribeToRoom({
        roomId: this.props.clickedChatroom.id,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({
               messageList: [...this.state.messageList, message],
             });
          }
        }
      });
    }
  render(){
    return(
        <button className="button_chat" onClick={this.onClick}>Chat</button>
    );
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps, {
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
})(ChatButton);
