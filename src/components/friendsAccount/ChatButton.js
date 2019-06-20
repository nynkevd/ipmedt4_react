// React importeren
import React from 'react';
import { Redirect } from 'react-router-dom';

// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
  changeCurrentChatroom,
} from './../../actions';

// CSS importeren
import './ChatButton.css';

class ChatButton extends React.Component{
  constructor(props){
    super(props);
    this.state=({redirect: ""});
  }

  onClick = event => {
    const currentUser = this.props.chatKitUser;
    const rooms = currentUser.rooms;
    const selectedUser = this.props.chosenFriend.toLowerCase();//props.user.toLowerCase();
    const roomName = currentUser.id + "_" + selectedUser;
    const users = [selectedUser, currentUser.id];
    var messageList = [];

    if(!this.checkIfRoomExists(rooms, users)){
      this.createRoom(currentUser, roomName, selectedUser);
    }else{
      this.setState({
        redirect: <Redirect to='/chat' />
      });
    }
  }

  checkIfRoomExists = (rooms, users) => {
    var exists = false;
    console.log(this);

    for(var i = 0; i < rooms.length; i++){
      console.log(this);
      if(rooms[i].customData && rooms[i].customData.isDirectMessage){
        console.log(this);
        const roomUsers = rooms[i].customData.userIds;
        console.log(rooms);
        if(roomUsers.sort().join('') === users.sort().join('')){
          console.log(rooms[i]);
          this.props.changeCurrentChatroom(rooms[i]);
          exists = true;
          var currentRoom = rooms[i];
          //testfunction(room);
        }
      }
    }

    // rooms.forEach(function(room){
    //   if(room.customData && room.customData.isDirectMessage){
    //     console.log(this);
    //     const roomUsers = room.customData.userIds;
    //     console.log(rooms);
    //     if(roomUsers.sort().join('') === users.sort().join('')){
    //       console.log(room);
    //       //this.props.changeCurrentChatroom(room);
    //       exists = true;
    //       var currentRoom = room;
    //       //testfunction(room);
    //     }
    //   }
    // });

    return exists;
  }

  createRoom = (currentUser, roomName, selectedUser) => {
    currentUser.createRoom({
      name: roomName,
      private: true,
      addUserIds: [selectedUser],
      customData: {
        isDirectMessage: true,
        userIds: [currentUser.id, selectedUser]
      }
    }).then(room => {
      this.props.changeCurrentChatroom(room); //moet dit?
      //console.log(this.state.currentChatroon);
      this.setState({
        redirect: <Redirect to='/chat' />
      });
    });
  }

  // subscribeToChatroom = (currentUser) => {
  //   console.log("In room");
  //     // subscribeToRoom is een functie van ChatKit om aan een room deel te nemen
  //     currentUser.subscribeToRoom({
  //       roomId: this.props.currentChatroom.id,
  //       messageLimit: 100,
  //       hooks: {
  //         onMessage: message => {
  //           this.setState({
  //              messageList: [...this.state.messageList, message],
  //            });
  //         }
  //       }
  //     });
  //   }
  render(){
    return(
      <div>
        {this.state.redirect}{/*dit moet veranderd worden, zodat je naar chatroom gaat*/}
        <button className="button_chat" onClick={this.onClick}>Chat</button>
      </div>

    );
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    currentChatroom: state.currentUserChatroom,
  };
}

export default connect(mapStateToProps, {
  changeChatKitUser: changeChatKitUser,
  changeCurrentChatroom: changeCurrentChatroom,
})(ChatButton);
