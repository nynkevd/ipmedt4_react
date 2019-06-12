// React importeren
import React from 'react';
import axios from 'axios';
// ToastManager importeren
// import toast from 'toasted-notes';

// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChosenFriend,
} from './../../actions';

// Eigen componenten importeren
import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import TravelRoute from '../account/TravelRoute';
import FriendButton from '../friendsAccount/FriendButton';

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
const base_url = "http://136.144.230.97:8080/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class FriendsAccount extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userProfilePicture: null,
      userTravelFrom: null,
      userTravelTo: null,
    }
  }

  componentDidMount(){
    this.getChosenFriendInfoFromApi();
  }

  getChosenFriendInfoFromApi = _ => {
    axios.get(base_url + "userinfo/" + this.props.chosenFriend + api_token).then(res => {
      this.setState({
        userProfilePicture: res.data.picture,
        userTravelTo: res.data.to,
        userTravelFrom: res.data.from,
      })
    });
  }

  render(){
  // let notify = toast.notify("Vriend toegevoegd");
  console.log(this.state.userTravelTo);
  return(
      // TopBar
      // Account -> Profielfoto, naam, reistraject, interesses
      // Knoppen Voeg Toe en Chat
      <div>
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.state.userProfilePicture} naam={this.props.chosenFriend} />
          <TravelRoute from={this.state.userTravelFrom} to={this.state.userTravelTo} />

        </div>
        <div className="buttonsAddAndChat">
        {/* / Als je op de knop drukt, wordt deze persoon aan je FriendsList toegevoegd.*/}
          <FriendButton friend={this.props.chosenFriend}> </FriendButton>

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
    chosenFriend: state.chosenFriend,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
  changeChosenFriend: changeChosenFriend,
})(FriendsAccount);
