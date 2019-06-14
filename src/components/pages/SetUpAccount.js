//React en benodigdheden importeren
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import { connect } from 'react-redux';
import {
    changeUserName,
    changeLoggedIn,
    changeUserTravelFrom,
    changeUserTravelTo,
    changeProfilePictureList,
    changeUserProfilePicture,
    changeMyInterests,
    changeChosenInterest} from "./../../actions";

import ProfilePictureList from '../editAccount/ProfilePictureList';

import "./SetUpAccount.css";

const base_url = "http://136.144.230.97:8080/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
var added = [];
var userInterests = [];

class SetUpAccount extends React.Component{
  interests = [];
  stations = [
    "Leiden",
    "Voorschoten",
    "Alphen aan den Rijn",
    "Nieuw Vennep",
    "De Vink"
  ];

  componentDidMount(){
    this.getProfilePictureList();
    this.added = [];
    this.getInterestsFromAPI();
  }

  //Updaten van de variabele firstlogin naar 0 -> false
  updateFirstLogin = _ => {
    axios.get(`http://136.144.230.97:4000/updatefirstlogin?username=${this.props.userName}`)
        .catch(err => console.error(err))
  }

  // nodig voor profilePictureList component
  selectCurrentPicture = (picture, pictureList) => {
    for(var i = 0; i < pictureList.length; i++){
      if(pictureList[i] === picture){
        var currentPicture = document.getElementById("profilePicture" + i);
        currentPicture.classList.add("selected");
        this.props.changeUserProfilePicture(i++)
      }
    }
  }

  getProfilePictureList = () => {
    axios.get(base_url + "pictures" + api_token).then(res => {
      this.props.changeProfilePictureList(res.data);
      this.getUserInfo(this.props.profilePictureList);
    });
  }

  getUserInfo = (pictureList) => {
    axios.get(base_url + "userinfo/" + this.props.userName + api_token).then(res => {
      this.selectCurrentPicture(res.data.picture, pictureList);
    });
  }

  // Mogelijke interesses ophalen uit de database en in array zetten
  getInterestsFromAPI = () => {
    this.interests = [];
    axios.get(base_url + "interests/" + api_token)
      .then(res => {
        for(let i = 0; i < res.data.length; i++){
          this.interests.push((res.data[i]).toString());
        }
      });
  }

  // update de database
  updateDatabase(){
    //profilepicture en travelroute
    axios.get(`http://136.144.230.97:4000/userinfo/update?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}`)
      .then(console.log("Succesfully updated info"))
        .catch(err => console.error(err))

    //voeg gebruiker toe aan de user_info tabel
    axios.get(`http://136.144.230.97:4000/user_info/add?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}&age=19`)
      .then(console.log("gebruiker toegevoegd aan gewenste tabel"))
        .catch(err => console.error(err))

    //user interests
    for(let a = 0; a < this.props.myInterests.length; a++){
    axios.get(`http://136.144.230.97:4000/user_interests/add?username=${this.props.userName}&interest=${this.props.myInterests[a]}`)
      .then(console.log("Interesse toegevoegd"))
        .catch(err => console.error(err))
    }
  }

  // verander de route
  onChangeUserTravelFrom = event =>{
    if(event.target.value !== this.props.userTravelTo){
      this.props.changeUserTravelFrom(event.target.value);
      document.getElementById("travelErrorMessage").classList.add("hideErrorMessageSetUp");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("travelErrorMessage").classList.remove("hideErrorMessageSetUp");
    }
  }

  onChangeUserTravelTo = event =>{
    if(event.target.value !== this.props.userTravelFrom){
      this.props.changeUserTravelTo(event.target.value);
      document.getElementById("travelErrorMessage").classList.add("hideErrorMessageSetUp");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("travelErrorMessage").classList.remove("hideErrorMessageSetUp");
    }
  }

  //verander chosenInterest
  onChangeChosenInterest = event => {
    this.props.changeChosenInterest(event.target.value);
    if(!userInterests.includes(this.props.chosenInterest)){
      if(this.props.chosenInterest !== "" && this.props.chosenInterest !== "Kies een interesse"){
          userInterests.push(this.props.chosenInterest);
      }
    }
    this.props.changeMyInterests(userInterests);
  }

  fillAddedInterests = _ => {
    if(this.props.chosenInterest !== "") {
      if (!(added.includes(this.props.chosenInterest))) {
        added.push(this.props.chosenInterest);
        document.getElementById("intrestErrorMessage").classList.add("hideErrorMessageSetUp");
        console.log(added[added.length-1])
      } else if(!(added[added.length-1] === this.props.chosenInterest)) {
        //Error messages tonen als de interesse al is toegevoegd
        document.getElementById("intrestErrorMessage").classList.remove("hideErrorMessageSetUp");
      }
      return (
          added.map((addedInterest) =>
          <p id="added--interests" value={addedInterest} key={addedInterest}> {addedInterest}</p>
          )
        );
      }
  }

  //alle ingevoerde velden opslaan in de database
  saveAllSettings = _ =>{
    if(!userInterests.includes(this.props.chosenInterest)){
      userInterests.push(this.props.chosenInterest);
    }
    this.updateFirstLogin();
    this.updateDatabase();
  }

  render(){
    return this.props.loggedIn
      ? <div className="SetUpAccountContainer">
        <div className="choose--form">
          <div className="my--settings">
            <h1 className="choose--header" >Voeg interesses toe</h1>
              <select value={this.props.chosenInterest} onChange={this.onChangeChosenInterest} className="choose--interests">
                <option value="" disabled selected>Kies je interesses</option>
                {this.interests.map((interest) =>
                  <option value={interest} key={interest}>{interest}</option>
                )}
              </select>
              <span className="my__interests">Toegevoegde interesses</span>
              <div className="added">
                {this.fillAddedInterests()}
              </div>
              <p className="errorMessageSetUp hideErrorMessageSetUp" id="intrestErrorMessage">Interesse is al toegevoegd</p>
            </div>
            <h1 className="choose--header">Uw reistraject</h1>
            <div className="choose--route">
              <span className="choose--text">van: </span>
              <span className="choose--text">naar: </span>
            </div>
            <div className="set--route">
              <div className="my--settings">
                <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="choose--interests">
                  <option value="" disabled selected>Kies je station</option>
                  {this.stations.map((station) =>
                    <option value={station} key={station}>{station}</option>
                  )}
                </select>
              </div>
              <div className="my--settings">
                <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="choose--interests">
                  <option value="" disabled selected>Kies je station</option>
                  {this.stations.map((station) =>
                    <option value={station} key={station}>{station}</option>
                  )}
                </select>
              </div>
            </div>
            <p className="errorMessageSetUp hideErrorMessageSetUp" id="travelErrorMessage">Stations kunnen niet hetzelfde zijn</p>
            <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>
          </div>


          <Link to="/search">
            <input
              className="button--choose"
              type="submit"
              value="Opslaan"
              onClick={this.saveAllSettings} />
          </Link>
        </div>
      //Naar de login pagina als een gebruiker niet is ingelogd
      : <Redirect to="/login" />
  };
}

const mapStateToProps = state =>{
  return{
    userName: state.userName,
    loggedIn: state.loggedIn,
    userTravelTo: state.userTravelTo,
    userTravelFrom: state.userTravelFrom,
    profilePictureList: state.profilePictureList,
    userProfilePicture: state.userProfilePicture,
    myInterests: state.myInterests,
    chosenInterest: state.chosenInterest,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeUserTravelTo: changeUserTravelTo,
  changeUserTravelFrom: changeUserTravelFrom,
  changeProfilePictureList: changeProfilePictureList,
  changeUserProfilePicture: changeUserProfilePicture,
  changeMyInterests: changeMyInterests,
  changeChosenInterest: changeChosenInterest,
})(SetUpAccount);
