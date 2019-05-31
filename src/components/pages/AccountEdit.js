import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import ProfilePictureList from '../editAccount/ProfilePictureList';
import UserName from '../editAccount/UserName';
import ReisTraject from '../editAccount/ReisTraject';

import './AccountEdit.css';

import axios from "axios";

class AccountEdit extends React.Component{
  state = { profilePicture: "",  pictureList: [], travelFrom: "", travelTo: ""}
  BASE_URL = "http://136.144.230.97:8080/api/";
  username = "Anouk"; //Moet aangepast worden naar de ingelogde gebruiker
  api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

  componentDidMount(){
    // Lijst van de mogelijke profielfotos
    axios.get(this.BASE_URL + "pictures" + this.api_token).then(res => {
      console.log(res);
      this.setState({pictureList: res.data});

      // De userinfo wordt opgevraag en de lijst van profielfotos wordt meegegeven
      this.getUserInfo(res.data);
    });
  }

  getUserInfo = (pictureList) => {
    axios.get(this.BASE_URL + "userinfo/" + this.username + this.api_token).then(res => {
      // De huidige profielfoto wordt opgevraagd en meegegeven
      this.selectCurrentPicture(res.data.picture, pictureList);

      this.setState({
        travelFrom: res.data.from,
        travelTo: res.data.to
      });
    });
  }

  selectCurrentPicture = (picture, pictureList) => {
    // De huidige profielfoto wordt geselecteerd
    for(var i = 0; i < pictureList.length; i++){
      if(pictureList[i] == picture){
        var currentPicture = document.getElementById("profilePicture" + i);
        currentPicture.classList.add("selected");
      }
    }
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="accountEditPageContainer">
          <h1>Edit account</h1>

          <ProfilePictureList pictureList={this.state.pictureList} click={this.pictureOnClick}/>
          <UserName username={this.username}/>
          <ReisTraject from={this.state.travelFrom} to={this.state.travelTo}/>

        </div>
        <BottomNav />
      </div>
    )
  }
}

export default AccountEdit;
