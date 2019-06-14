// React importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// ToastManager importeren
// import toast from 'toasted-notes';

// Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeChatKitUser,
  changeChosenFriend,
  changeLoggedIn,
  changeAllUserFriends,
  changeAddOrDeleteFriend,
} from './../../actions';

// Eigen componenten importeren
import UserInfo from '../friendsAccount/UserInfo';
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
      isFriend: null,
      buttonFunction: null,
      buttonClass: "add",
      buttonText: "Vriend Toevoegen",
    }
  }

  componentDidMount(){
    this.getChosenFriendInfoFromApi();
    // this.getUserFriendsFromApi();
    this.checkIfFriend();
    console.log(this.props.allUserFriends);
  }

  checkIfFriend = _ => {
    // HIER MOET ER WORDEN GECHECKED OF DE GERENDERDE USER  VOORKOMT IN DE VRIENDENLIJST VAN DE INGELOGDE USER
    // LUKT ME NIET MOET ER NOG NAAR KIJKEN!!!!!
    console.log(this.props.chosenFriend +  " CHOSEN FRIEND");
    console.log(this.props.allUserFriends +" FRIENDS");

    if (this.props.allUserFriends.length == 0){
      this.props.changeAddOrDeleteFriend("add");
      this.setState({buttonClass: "add"});
      this.setState({buttonText: "Vriend Toevoegen"});
    }

    for(var i = 0; i < this.props.allUserFriends.length; i++){
      if (this.props.allUserFriends[i] == this.props.chosenFriend){
        console.log("user " + this.props.allUserFriends[i]);
        this.props.changeAddOrDeleteFriend("delete");
        this.setState({buttonClass: "delete"});
        this.setState({buttonText: "Vriend Verwijderen"});
        break;
      }
      else {
        this.props.changeAddOrDeleteFriend("add");
        this.setState({buttonClass: "add"});
        this.setState({buttonText: "Vriend Toevoegen"});
      }
    }
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

  updateComp = _ => {
    console.log("re-render vanuit comp");
    this.forceUpdate();
  }
  render(){
  // let notify = toast.notify("Vriend toegevoegd");
  return this.props.loggedIn
  ?   // TopBar
      // Account -> Profielfoto, naam, reistraject, interesses
      // Knoppen Voeg Toe en Chat
      <div>
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.state.userProfilePicture} naam={this.props.chosenFriend} />
          <TravelRoute from={this.state.userTravelFrom} to={this.state.userTravelTo} />

        </div>
        <div className="buttonsAddAndChat">
        {/* / Als je op de knop drukt, wordt deze persoon aan je FriendsList toegevoegd.*/}
          <FriendButton friend={this.props.chosenFriend} buttonClass={this.state.buttonClass} buttonText={this.state.buttonText} onSubmit={this.updateComp}> </FriendButton>

          {/* Als je op de knop drukt, wordt er een room aangemaakt en kom je in die room
           Als de room al bestaat, dan ga je gewoon naar die room toe */}
          <button
            className="button--chat"
            type="submit"
            value="Chat"
            onClick={this.onClick} />
          </div>
      </div>
      : <Redirect to="/login" />
}
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
    chosenFriend: state.chosenFriend,
    loggedIn: state.loggedIn,
    allUserFriends: state.allUserFriends,
    addOrDeleteFriend: state.addOrDeleteFriend,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeChatKitUser: changeChatKitUser,
  changeChosenFriend: changeChosenFriend,
  changeLoggedIn: changeLoggedIn,
  changeAllUserFriends: changeAllUserFriends,
  changeAddOrDeleteFriend: changeAddOrDeleteFriend,
})(FriendsAccount);
