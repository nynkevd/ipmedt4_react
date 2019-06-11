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
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import ProfilePictureList from '../editAccount/ProfilePictureList';
import ReisTraject from '../editAccount/ReisTraject';
//CSS importeren
import './AccountEdit.css';

const base_url = "http://136.144.230.97:8080/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class AccountEdit extends React.Component{

  componentDidMount(){
    this.getProfilePictureList();
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

    axios.get(`http://136.144.230.97:4000/userinfo/update?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}`)
      .then(this.getUserInfo)
        .catch(err => console.error(err))
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

  //Later toevoegen:
  // <UserName username={this.state.username} onSubmit={this.onUsernameChange}/>

  render(){
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="accountEditPageContainer">
          <h1>Edit account</h1>

          <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>

          <ReisTraject van={this.props.userTravelFrom} naar={this.props.userTravelTo} from={this.setTravelFrom} to={this.setTravelTo}/>

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
})(AccountEdit);
