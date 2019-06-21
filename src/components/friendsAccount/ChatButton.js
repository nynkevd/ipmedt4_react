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
    const selectedUser = this.props.chosenFriend.toLowerCase();
    const roomName = currentUser.id + "_" + selectedUser;
    const users = [selectedUser, currentUser.id];

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
    for(var i = 0; i < rooms.length; i++){
      if(rooms[i].customData && rooms[i].customData.isDirectMessage){
        const roomUsers = rooms[i].customData.userIds;
        if(roomUsers.sort().join('') === users.sort().join('')){
          this.props.changeCurrentChatroom(rooms[i]);
          exists = true;
        }
      }
    }
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
      this.props.changeCurrentChatroom(room);
      this.setState({
        redirect: <Redirect to='/chat' />
      });
    });
  }

  render(){
    return(
      <div>
        {this.state.redirect}{/*dit moet veranderd worden, zodat je naar chatroom gaat*/}
        <button className="chatButton" onClick={this.onClick}>Chat</button>
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
