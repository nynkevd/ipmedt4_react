import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import Reistraject from '../account/Reistraject';

import './Account.css';

import axios from "axios";

class Account extends React.Component{
  state = { interests:[], profilePicture: "", travelFrom: "", travelTo: "" };
  BASE_URL = "http://136.144.230.97:8080/api/";
  api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
  username = "Anouk"; // Moet aangepast worden naar de ingelogde gebruiker

  componentDidMount(){
    //Userinfo api -> profielfoto, van, naar
    axios.get(this.BASE_URL + "userinfo/" + this.username + this.api_token).then(res => {
      console.log(res);
      this.setState({
        profilePicture: res.data.picture,
        travelFrom: res.data.from,
        travelTo: res.data.to,
      });
    });

    //Interests api -> interests array
    axios.get(this.BASE_URL + "interests/" + this.username + this.api_token).then(res => {
      console.log(res.data);
      this.setState({
        interests: res.data
      });
    });
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.state.profilePicture} naam={this.username}></UserInfo>
          <Reistraject van={this.state.travelFrom} naar={this.state.travelTo}></Reistraject>
          <Interests interests={this.state.interests}></Interests>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Account;
