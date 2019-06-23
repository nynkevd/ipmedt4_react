// React en benodigheden importeren
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
  changePageToReturnTo,
} from './../../actions';
// CSS importeren
import './FriendsAccount.css';
// Eigen componenten importeren
import UserInfoFriend from '../friendsAccount/UserInfoFriend';
import Interests from '../account/Interests';
import TravelRoute from '../account/TravelRoute';
import FriendButton from '../friendsAccount/FriendButton';
import ChatButton from '../friendsAccount/ChatButton';
import TopBarFriendsAccount from '../friendsAccount/TopBarFriendsAccount';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;

class FriendsAccount extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userProfilePicture: "/img/placeholder.png",
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
  }

  checkIfFriend = _ => {
    if (this.props.allUserFriends.length === 0){
      this.props.changeAddOrDeleteFriend("add");
      this.setState({buttonClass: "add"});
      this.setState({buttonText: "Vriend Toevoegen"});
    }

    for(var i = 0; i < this.props.allUserFriends.length; i++){
      if (this.props.allUserFriends[i] === this.props.chosenFriend){
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
    this.forceUpdate();
  }
  render(){
  return this.props.loggedIn
    ? <div>
      {/* Redux, state veranderd als je van search komt of als je van friendslist komt*/}
      <TopBarFriendsAccount />
        <div className="friendsAccountPageContainer">
          <UserInfoFriend profielfoto={this.state.userProfilePicture} naam={this.props.chosenFriend} />
          <TravelRoute from={this.state.userTravelFrom} to={this.state.userTravelTo} />
          <Interests interests={this.props.userInterests} />
          <div className="friendsAccountPageContainer__buttons">
          {/* Als je op de knop drukt, wordt deze persoon aan je FriendsList toegevoegd.*/}
            <FriendButton friend={this.props.chosenFriend} buttonClass={this.state.buttonClass} buttonText={this.state.buttonText} onSubmit={this.updateComp} />
            {/* Als je op de knop drukt, wordt er een room aangemaakt en kom je in die room
             Als de room al bestaat, dan ga je gewoon naar die room toe */}
            <ChatButton chosenFriend={this.props.chosenFriend} currentUser={this.props.chatKitUser} />
          </div>
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
    currentChatroom: state.currentChatroom,
    chosenFriend: state.chosenFriend,
    loggedIn: state.loggedIn,
    allUserFriends: state.allUserFriends,
    addOrDeleteFriend: state.addOrDeleteFriend,
    pageToReturnTo: state.pageToReturnTo,
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
  changePageToReturnTo: changePageToReturnTo,
})(FriendsAccount);
