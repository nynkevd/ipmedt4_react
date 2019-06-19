// React importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeChatKitUser,
  changeUserInterests,
  changeChosenFriend,
  changeLoggedIn,
  changeAllUserFriends,
  changeAddOrDeleteFriend,
} from './../../actions';

// CSS importeren
import './FriendsAccount.css';

// Eigen componenten importeren
import UserInfo from '../friendsAccount/UserInfo';
import Interests from '../account/Interests';
import TravelRoute from '../account/TravelRoute';
import FriendButton from '../friendsAccount/FriendButton';
import ChatButton from '../friendsAccount/ChatButton';
import TopBarFriendsAccount from '../friendsAccount/TopBarFriendsAccount';

const base_url = "https://api.ovtravelbuddy.nl/api/";
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
    this.getUserInterestsFromApi(base_url, api_token);
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

  getUserInterestsFromApi = (base_url, api_token) => {
    axios.get(base_url + "interests/" + this.props.chosenFriend + api_token).then(res => {
      this.props.changeUserInterests(res.data);
    });
  }

  updateComp = _ => {
    console.log("re-render vanuit comp");
    this.forceUpdate();
  }
  render(){
    console.log(this.state.userTravelTo);
  return this.props.loggedIn
  ?  <div>
      <TopBarFriendsAccount />
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.state.userProfilePicture} naam={this.props.chosenFriend} />
          <TravelRoute from={this.state.userTravelFrom} to={this.state.userTravelTo} />
          <Interests interests={this.props.userInterests} />
        </div>
        <div className="buttonsAddAndChat">
        {/* Als je op de knop drukt, wordt deze persoon aan je FriendsList toegevoegd.*/}
          <FriendButton className="buttonsAddAndChat__addButton" friend={this.props.chosenFriend} buttonClass={this.state.buttonClass} buttonText={this.state.buttonText} onSubmit={this.updateComp}> </FriendButton>
          {/* Als je op de knop drukt, wordt er een room aangemaakt en kom je in die room
           Als de room al bestaat, dan ga je gewoon naar die room toe */}
          <ChatButton className="buttonsAddAndChat__chatButton" chosenFriend={this.props.chosenFriend} currentUser={this.props.chatKitUser}></ChatButton>
        </div>
      </div>
      : <Redirect to="/login" />
}
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    chatKitUser: state.chatKitUser,
    userInterests: state.userInterests,
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
  changeUserInterests: changeUserInterests,
  changeChosenFriend: changeChosenFriend,
  changeLoggedIn: changeLoggedIn,
  changeAllUserFriends: changeAllUserFriends,
  changeAddOrDeleteFriend: changeAddOrDeleteFriend,
})(FriendsAccount);
