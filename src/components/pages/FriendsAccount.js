// React importeren
import React from 'react';
// ToastManager importeren
// import toast from 'toasted-notes';

// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
} from './../../actions';

// Eigen componenten importeren
import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import TravelRoute from '../account/TravelRoute';

// const onClick = () => {
//   const currentUser = props.chatKitUser;
//   const rooms = currentUser.rooms;
//   const selectedUser = "nynke";//props.user.toLowerCase();
//   const roomName = currentUser.id + "_" + selectedUser;
//   const users = [selectedUser, currentUser.id];
//   var messageList = [];
//
//   if(!checkIfRoomExists(rooms, users)){
//     createRoom(currentUser, roomName, selectedUser);
//     // currentUser.subscribeToRoom({
//     // })
//   }else{
//     // En join de room
//   }
// }
//
// const checkIfRoomExists = (rooms, users) => {
//   var exists = false
//   rooms.forEach(function(room){
//     if(room.customData && room.customData.isDirectMessage){
//       const roomUsers = room.customData.userIds;
//       if(roomUsers.sort().join('') === users.sort().join('')){
//         exists = true;
//       }
//     }
//   });
//
//   return exists;
// }
//
// const createRoom = (currentUser, roomName, selectedUser) => {
//   currentUser.createRoom({
//     name: roomName,
//     private: true,
//     addUserIds: [selectedUser],
//     customData: {
//       isDirectMessage: true,
//       userIds: [currentUser.id, selectedUser]
//     }
//   });
// }

class FriendsAccount extends React.Component {
  render(){
  // let notify = toast.notify("Vriend toegevoegd");
  return(
      // TopBar
      // Account -> Profielfoto, naam, reistraject, interesses
      // Knoppen Voeg Toe en Chat
      <div>
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.props.userProfilePicture} naam={this.props.userDisplayName} />
          <TravelRoute van={this.props.userTravelFrom} naar={this.props.userTravelTo} />

        </div>
        <div className="buttonsAddAndChat">
        {/* / Als je op de knop drukt, wordt deze persoon aan je FriendsList toegevoegd.*/}
          <button
            className="button--add"
            type="submit"
            value="Voeg toe"
            onClick={this.onSubmit} />

          {/* Als je op de knop drukt, wordt er een room aangemaakt en kom je in die room
           Als de room al bestaat, dan ga je gewoon naar die room toe */}
          <button
            className="button--chat"
            type="submit"
            value="Chat"
            onClick={this.onClick} />
          </div>
      </div>
  );
}
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(FriendsAccount);
