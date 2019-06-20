//React en benodigheden importeren
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeUserInterests,
  changeUserProfilePicture,
  changeUserTravelFrom,
  changeUserTravelTo,
  changeProfilePictureList,
  changeMyInterests,
  changeChosenInterest,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import ProfilePictureList from '../editAccount/ProfilePictureList';
import EditTravelRoute from '../editAccount/EditTravelRoute';
import {fillAddedInterests} from '../methods.js';
//CSS importeren
import './AccountEdit.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
var temp_interests;
var added = [];
var chosenInterests = [];
var interests = [];

class AccountEdit extends React.Component{
  temp_interests = [];

  componentDidMount(){
    this.getProfilePictureList();
    this.getRemainingInterestsFromAPI();
    added = [];
    chosenInterests = [];
    interests = [];
  }

  //Lijst van alle profielfoto's opvragen van API
  getProfilePictureList = () => {
    axios.get(base_url + "pictures" + api_token).then(res => {
      this.props.changeProfilePictureList(res.data);
      // De userinfo wordt opgevraag en de lijst van profielfotos wordt meegegeven
      this.getUserInfo(this.props.profilePictureList);
    });
  }

  //De wijzigingen opslaan in de database
  updateUserInfo = _ => {
    this.props.changeUserTravelTo(this.props.userTravelTo);
    this.props.changeUserTravelFrom(this.props.userTravelFrom);

    if(!chosenInterests.includes(this.props.chosenInterest)){
      chosenInterests.push(this.props.chosenInterest);
    }
    this.props.changeChosenInterest("");

    this.deleteInterestsFromDatabase();

    axios.get(`https://dataserver.ovtravelbuddy.nl/userinfo/update?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}`)
      .then(this.getUserInfo)
        .catch(err => console.error(err))

    for(let a = 0; a < chosenInterests.length; a++){
    axios.get(`https://dataserver.ovtravelbuddy.nl/user_interests/add?username=${this.props.userName}&interest=${chosenInterests[a]}`)
      .then(console.log("Interesse toegevoegd"))
        .catch(err => console.error(err))
    }
    chosenInterests = [];
  }

  //De gegevens van de user ophalen van de API
  getUserInfo = (pictureList) => {
    axios.get(base_url + "userinfo/" + this.props.userName + api_token).then(res => {
      // De huidige profielfoto wordt opgevraagd en meegegeven
      this.selectCurrentPicture(res.data.picture, pictureList);
    });
  }

  //De geselecteerde profielfoto opslaan
  selectCurrentPicture = (picture, pictureList) => {
    for(var i = 0; i < pictureList.length; i++){
      var number = i+1
      if(pictureList[i] === picture){
        var currentPicture = document.getElementById("profilePicture" + i);
        currentPicture.classList.add("selected");
        this.props.changeUserProfilePicture(number);
      }
    }
  }

  //TravelFrom wijzigen
  setTravelFrom = (event) => {
    if(event.target.value !== this.props.userTravelTo){
      this.props.changeUserTravelFrom(event.target.value)
      document.getElementById("fromErrorMessage").classList.add("hideErrorMessage");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelTo
      document.getElementById("fromErrorMessage").classList.remove("hideErrorMessage");
    }
  }

  //TravelTo wijzigen
  setTravelTo = (event) => {
    if(event.target.value !== this.props.userTravelFrom){
      this.props.changeUserTravelTo(event.target.value);
      document.getElementById("toErrorMessage").classList.add("hideErrorMessage");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("toErrorMessage").classList.remove("hideErrorMessage");
    }
  }

  deleteOnClick = (event) => {
    var deleteItem = document.getElementById(event.target.id).id;
    document.getElementById(deleteItem).parentElement.setAttribute("class", "hidden");
    //verwijderde items in array stoppen
    this.temp_interests.push(deleteItem);
  }

  deleteInterestsFromDatabase(){
    for(let i = 0; i < this.temp_interests.length; i ++){
      axios.get(`https://dataserver.ovtravelbuddy.nl/user_interests/delete?username=${this.props.userName}&interest=${this.temp_interests[i]}` )
        .then(console.log("deleted"))
          .catch(err => console.error(err))
        }
  }

  getRemainingInterestsFromAPI = () => {
    this.interests = [];
    axios.get(base_url + "interests" + api_token)
      .then(res => {
        for(let i = 0; i < res.data.length; i++){
          if(!(this.props.userInterests.includes(res.data[i].toString()))){
            interests.push((res.data[i]).toString());
          }
        }
      });
  }

  onChangeChosenInterest = event => {
    this.props.changeChosenInterest(event.target.value);
    if(!chosenInterests.includes(this.props.chosenInterest)){
      if(this.props.chosenInterest !== "" && this.props.chosenInterest !== "Kies een interesse"){
          chosenInterests.push(this.props.chosenInterest);
      }
    }
  }
  render(){
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="accountEditPageContainer">
          <h1>Edit account</h1>

          <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>

          <EditTravelRoute van={this.props.userTravelFrom} naar={this.props.userTravelTo} from={this.setTravelFrom} to={this.setTravelTo}/>
          <h2>Uw interesses</h2>
          <div id="interestsList">
            {
              this.props.userInterests.map((interest, index) =>
              <div key={interest}>
                    <p className="interest--p" key={index}>{interest}</p>
                    <img onClick={this.deleteOnClick} id={interest} className="icon test" src="./img/icons/trash.svg" alt="verwijder item" />
              </div>
              )
              }
          </div>
          <select className="choose-interests" value={this.props.chosenInterest} onChange={this.onChangeChosenInterest}>
            {interests.map((interest) =>
              <option value={interest} key={interest}>{interest}</option>
            )}
          </select>
          {fillAddedInterests(this.props.chosenInterest)}
          <p className="errorMessageSetUp hideErrorMessageSetUp" id="intrestErrorMessage">Interesse is al toegevoegd</p>
          <div className="next">

              <Link to="/account"><button className="button" onClick={this.updateUserInfo}>Bevestig</button></Link><br /><br />
              <Link to="/account" id="back"><p>Terug naar account</p></Link>
          </div>
      </div>
      </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    userInterests: state.userInterests,
    userProfilePicture: state.userProfilePicture,
    userTravelFrom: state.userTravelFrom,
    userTravelTo: state.userTravelTo,
    profilePictureList: state.profilePictureList,
    chosenInterest: state.chosenInterest,
    myInterests: state.myInterests,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeUserInterests: changeUserInterests,
  changeUserProfilePicture: changeUserProfilePicture,
  changeUserTravelFrom: changeUserTravelFrom,
  changeUserTravelTo: changeUserTravelTo,
  changeProfilePictureList: changeProfilePictureList,
  changeChosenInterest: changeChosenInterest,
  changeMyInterests: changeMyInterests,
})(AccountEdit);
