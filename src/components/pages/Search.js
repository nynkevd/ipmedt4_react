//React en benodigheden importeren
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Chatkit from '@pusher/chatkit-client';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeMatches,
  changeAllUserFriends,
  changeAddOrDeleteFriend,
  changeAllStations,
} from "./../../actions";
//Eigen componenten importeren
import BottomNav from '../layout/BottomNav';
import TopBar from '../layout/TopBar';
import Matches from '../matches/Matches';
//CSS importeren
import './Search.css';

class Search extends React.Component{

  componentDidMount(){
    //ChatManager aanmaken voor het chatten
    const chatManager = new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:a6e72788-6919-4ade-a86a-7beeaa73aa7d',
        userId: this.props.userName,
        tokenProvider: new Chatkit.TokenProvider({ url: 'https://chatserver.ovtravelbuddy.nl/authenticate' }),
    });
    chatManager.connect().then(currentUser => {
      this.props.changeChatKitUser(currentUser);
    })

    //Matches ophalen en tonen op basis van de ingelogde gebruiker
    this.getMatchesFromSessionUser(this.props.userName);
    //Kijken of er ingelogd is
    if(this.props.userName !== ""){
      this.props.changeLoggedIn(true);
    } else {
      this.props.changeLoggedIn(false);
    }

  }

  getMatchesFromSessionUser = username => {
    const base_url = "https://api.ovtravelbuddy.nl/api/match/";
    const api_token = process.env.REACT_APP_API_TOKEN;
    //Matches ophalen
    axios.get(base_url + username + api_token).then(res => {
      this.props.changeMatches(res.data);
    });

    axios.get("https://api.ovtravelbuddy.nl/api/friends/" + username + api_token).then(res => {
      console.log(res.data);
      this.props.changeAllUserFriends(res.data);
    });
  };

  render(){
    console.log(Object.keys(this.props.matches).length);
    return this.props.loggedIn
    ? <div>
        <TopBar />
        <div className="searchPageContainer">
          {Object.keys(this.props.matches).length > 0 ?
            <div>
              <h3 className="searchPageContainer__text">Dit zijn jouw matches:</h3>
              <Matches matches={this.props.matches}></Matches>
            </div>
            :
            <div id="nomatches">
              <p> Je hebt geen matches </p>
              <Link to="/editaccount"> <img id="sadLogo" src="./img/logoSadIntrest.svg" alt="Travel Buddy Sad Logo"/> </Link>
            </div>
          }
        </div>
        <BottomNav />
      </div>
    //Naar de login pagina sturen als er niet ingelogd is
    : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    matches: state.matches,
    allUserFriends: state.allUserFriends,
    addOrDeleteFriend: state.addOrDeleteFriend,
    allStations: state.allStations,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeMatches: changeMatches,
  changeAllUserFriends: changeAllUserFriends,
  changeAddOrDeleteFriend: changeAddOrDeleteFriend,
  changeAllStations: changeAllStations,
})(Search);
