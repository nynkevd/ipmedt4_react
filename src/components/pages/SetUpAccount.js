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
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import ProfilePictureList from '../editAccount/ProfilePictureList';
import {fillAddedInterests} from '../methods.js';
//CSS importeren
import "./SetUpAccount.css";

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;
var userInterests = [];

class SetUpAccount extends React.Component{
  interests = [];
  stations = this.props.allStations;

  componentDidMount(){
    this.getProfilePictureList();
    //De uitlog knop op display none zetten
    document.getElementById("link").classList.add("topBar__link--hidden");
    this.getInterestsFromAPI();
  }

  //Updaten van de variabele firstlogin naar 0 -> false
  updateFirstLogin = _ => {
    axios.get(`https://dataserver.ovtravelbuddy.nl/updatefirstlogin?username=${this.props.userName}`)
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
    axios.get(base_url + "interests" + api_token)
      .then(res => {
        for(let i = 0; i < res.data.length; i++){
          this.interests.push((res.data[i]).toString());
        }
      });
  }

  // update de database
  updateDatabase(){
    //profilepicture en travelroute
    axios.get(`https://dataserver.ovtravelbuddy.nl/userinfo/update?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}`)
        .catch(err => console.error(err))

    //voeg gebruiker toe aan de user_info tabel
    axios.get(`https://dataserver.ovtravelbuddy.nl/user_info/add?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}&age=19`)
        .catch(err => console.error(err))

    //user interests
    for(let a = 0; a < this.props.myInterests.length; a++){
    axios.get(`https://dataserver.ovtravelbuddy.nl/user_interests/add?username=${this.props.userName}&interest=${this.props.myInterests[a]}`)
        .catch(err => console.error(err))
    }
  }

  // verander de route
  onChangeUserTravelFrom = event =>{
    if(event.target.value !== this.props.userTravelTo){
      this.props.changeUserTravelFrom(event.target.value);
      document.getElementById("travelErrorMessage").classList.add("setUpAccountPageContainer__route__errorMessage--hide");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("travelErrorMessage").classList.remove("setUpAccountPageContainer__route__errorMessage--hide");
    }
  }

  onChangeUserTravelTo = event =>{
    if(event.target.value !== this.props.userTravelFrom){
      this.props.changeUserTravelTo(event.target.value);
      document.getElementById("travelErrorMessage").classList.add("setUpAccountPageContainer__route__errorMessage--hide");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("travelErrorMessage").classList.remove("setUpAccountPageContainer__route__errorMessage--hide");
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
      ? <div>
          <TopBar />
          <div className="setUpAccountPageContainer">

            <div className="setUpAccountPageContainer_profilePictureList">
              <h1 className="setUpAccountPageContainer_profilePictureList__title" >Kies een profielfoto</h1>
              <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>
            </div>

            <div className="setUpAccountPageContainer__route">
              <h1 className="setUpAccountPageContainer__route__title">Selecteer uw reistraject</h1>
              <span className="setUpAccountPageContainer__route__to">van: </span>
              <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="setUpAccountPageContainer__route__choose">
                <option value="" disabled selected>Kies je station</option>
                {this.stations.map((station) =>
                  <option value={station} key={station}>{station}</option>
                )}
              </select>
              <span className="setUpAccountPageContainer__route__from">naar: </span>
              <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="setUpAccountPageContainer__route__choose">
                <option value="" disabled selected>Kies je station</option>
                {this.stations.map((station) =>
                  <option value={station} key={station}>{station}</option>
                )}
              </select>
              <div className="setUpAccountPageContainer__route__errorMessage setUpAccountPageContainer__route__errorMessage--hide" id="travelErrorMessage">
                <p className="setUpAccountPageContainer__route__errorMessage__text">Stations kunnen niet hetzelfde zijn</p>
              </div>
            </div>

            <div className="setUpAccountPageContainer__interest">
              <h1 className="setUpAccountPageContainer__interest__title" >Voeg interesses toe</h1>
              <select value={this.props.chosenInterest} onChange={this.onChangeChosenInterest} className="setUpAccountPageContainer__interest__choose">
              <option value="" disabled selected>Kies je interesses</option>
              {this.interests.map((interest) =>
                <option value={interest} key={interest}>{interest}</option>
              )}
              </select>
              {fillAddedInterests(this.props.chosenInterest)}
              <div id="interestErrorMessage">{/*Deze div moet er staan omdat hier de error message komt vanuit fillAddedInterests()*/}</div>
            </div>

            <Link to="/search" className="setUpAccountPageContainer__link">
              <input
                className="setUpAccountPageContainer__link__button"
                type="submit"
                value="Opslaan"
                onClick={this.saveAllSettings} />
            </Link>
          </div>
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
    allStations: state.allStations,
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
