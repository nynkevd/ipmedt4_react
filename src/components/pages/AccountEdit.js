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
import TopBarEditAccount from '../editAccount/TopBarEditAccount';
import ProfilePictureList from '../editAccount/ProfilePictureList';
import EditTravelRoute from '../editAccount/EditTravelRoute';
import {fillAddedInterests} from '../methods.js';
//CSS importeren
import './AccountEdit.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;
var chosenInterests = [];
var interests = [];
var temp_interests = [];

class AccountEdit extends React.Component{

  componentDidMount(){
    this.getProfilePictureList();
    this.getRemainingInterestsFromAPI();
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
      document.getElementById("routeErrorMessage").classList.add("editTravelRouteContainer__errorMessage--hide");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelTo
      document.getElementById("routeErrorMessage").classList.remove("editTravelRouteContainer__errorMessage--hide");
    }
  }

  //TravelTo wijzigen
  setTravelTo = (event) => {
    if(event.target.value !== this.props.userTravelFrom){
      this.props.changeUserTravelTo(event.target.value);
      document.getElementById("routeErrorMessage").classList.add("editTravelRouteContainer__errorMessage--hide");
    } else {
      //Geef error messages als hetzelfde station wordt gekozen als de travelFrom
      document.getElementById("routeErrorMessage").classList.remove("editTravelRouteContainer__errorMessage--hide");
    }
  }

//verwijderde items in array stoppen
  deleteOnClick = (event) => {
    var deleteItem = document.getElementById(event.target.id).id;
    document.getElementById(deleteItem).parentElement.setAttribute("className", "hidden");
    temp_interests.push(deleteItem);
  }

  deleteInterestsFromDatabase(){
    for(let i = 0; i < temp_interests.length; i ++){
      axios.get(`https://dataserver.ovtravelbuddy.nl/user_interests/delete?username=${this.props.userName}&interest=${temp_interests[i]}`)
        .catch(err => console.error(err))
    }
  }

  getRemainingInterestsFromAPI = () => {
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
        <TopBarEditAccount />
        <div className="accountEditPageContainer">

          <div className="accountEditPageContainer__profilePictureList">
            <h1 className="accountEditPageContainer__profilePictureList__title">Verander uw profielfoto</h1>
            <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>
          </div>

          <EditTravelRoute van={this.props.userTravelFrom} naar={this.props.userTravelTo} from={this.setTravelFrom} to={this.setTravelTo}/>

          <div className="accountEditPageContainer__deleteInterests">
            <h1 className="accountEditPageContainer__deleteInterests__title">Verwijder interesses</h1>
            <div>
              {
                this.props.userInterests.map((interest, index) =>
                <div key={interest}>
                      <p className="accountEditPageContainer__deleteInterests__interest">{interest}</p>
                      <img onClick={this.deleteOnClick} id={interest} className="accountEditPageContainer__deleteInterests__icon" src="./img/icons/trash.svg" alt="verwijder item" />
                </div>
                )
                }
            </div>
          </div>

          <div className="accountEditPageContainer__addInterests">
            <h1 className="accountEditPageContainer__addInterests__title">Voeg interesses toe</h1>
            <select className="accountEditPageContainer__addInterests__choose" value={this.props.chosenInterest} onChange={this.onChangeChosenInterest}>
              <option value="" disabled>Kies een interesse</option>
              {interests.map((interest) =>
                <option value={interest} key={interest}>{interest}</option>
              )}
            </select>
            {fillAddedInterests(this.props.chosenInterest)}
            <div id="interestErrorMessage">{/*Deze div moet er staan omdat hier de error message komt vanuit fillAddedInterests()*/}</div>
          </div>

          <Link to="/account" className="accountEditPageContainer__link">
          <button className="accountEditPageContainer__link__button" onClick={this.updateUserInfo}>Bevestig</button>
          </Link>
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
