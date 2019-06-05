//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Chatkit from '@pusher/chatkit-client';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeMatches,
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
        tokenProvider: new Chatkit.TokenProvider({ url: 'http://136.144.230.97:5200/authenticate' }),
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
    const base_url = "http://136.144.230.97:8080/api/match/";
    const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
    //Matches ophalen
    axios.get(base_url + username + api_token).then(res => {
      this.props.changeMatches(res.data);
    });
  };

  render(){
    return this.props.loggedIn
    ? <div>
        <TopBar />
        <div className="searchPageContainer">
          <h1>Welkom {this.props.userName}</h1>
          <h3>Dit zijn jouw matches:</h3>
          <Matches matches={this.props.matches}></Matches>
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
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeMatches: changeMatches,
})(Search);
