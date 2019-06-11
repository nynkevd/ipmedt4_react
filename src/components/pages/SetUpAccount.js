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
    changeProfilePictureList} from "./../../actions";

import ProfilePictureList from '../editAccount/ProfilePictureList';
import ProfilePicture from '../editAccount/ProfilePicture';

const base_url = "http://136.144.230.97:8080/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
const interests = [];

class SetUpAccount extends React.Component{
  //
  // updateFirstLogin = _ => {
  //   //Updaten van de variabele firstlogin naar 0 -> false
  //   axios.get(`http://136.144.230.97:4000/updatefirstlogin?username=${this.props.userName}`)
  //       .catch(err => console.error(err))
  // }

  stations = [
    "Leiden",
    "Voorschoten",
    "Alphen aan den Rijn",
    "Nieuw Vennep",
    "De Vink"
  ];

  getProfilePictureList = () => {
    axios.get(base_url + "pictures" + api_token).then(res => {
      this.props.changeProfilePictureList(res.data);
      // De userinfo wordt opgevraag en de lijst van profielfotos wordt meegegeven
      this.getUserInfo(this.props.profilePictureList);
    });
  }

  getUserInfo = (pictureList) => {
    axios.get(base_url + "userinfo/" + this.props.userName + api_token).then(res => {
      this.selectCurrentPicture(res.data.picture, pictureList);
    });
  }

  // Mogelijke interesses ophalen uit de database en in array zetten
  getInterestsFromAPI(){
    axios.get(base_url + "interests/" + api_token)
      .then(res => {
        for(let i = 0; i < res.data.length; i++){
          interests.push((res.data[i]).toString());
        }
      })
      console.log(this.interests)
  }

  //update de database
  updateDatabase(){
    //profilepicture en travelroute
    axios.get(`http://136.144.230.97:4000/userinfo/update?username=${this.props.userName}&profile_picture=${this.props.userProfilePicture}&travelFrom=${this.props.userTravelFrom}&travelTo=${this.props.userTravelTo}`)
      .then(console.log("Succesfully updated info"))
        .catch(err => console.error(err))

    // axios.get(`http://136.144.230.97:4000/user_interests/add?username=${this.props.userName}&interest=VULEENINTERESSEIN`)
    //   .then(console.log("Interesse toegevoegd"))
    //     .catch(err => console.error(err))
    }

  //De geselecteerde interesses toevoegen aan een redux-variabele


  componentDidMount(){
    this.getInterestsFromAPI();
    this.getProfilePictureList();
    console.log(this.props.profilePictureList);
  }

  //alle ingevoerde velden opslaan in de database
  saveAllSettings(){
    // this.updateFirstLogin();
    this.updateDatabase();
    this.props.changeUserTravelTo(this.props.userTravelTo);
    this.props.changeUserTravelFrom(this.props.userTravelFrom);
  }

  render(){
    console.log(this.interests)
    return this.props.loggedIn
      ? <div>
          <h1>Kies je interesses</h1>
          <form action="">
            <select value="Hallo" onChange={this.change} className="chooseInterests">
              {interests.map((interest) =>
                <option value={interest} key={interest}>{interest}</option>
              )}
            </select>

            <h1>Kies je reistraject</h1>
            <span>van: </span>
            <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="chooseTraject">
              {this.stations.map((station) =>
                <option value={station} key={station}>{station}</option>
              )}
            </select>
            <br />
            <span>naar: </span>
            <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="chooseTraject">
              {this.stations.map((station) =>
                <option value={station} key={station}>{station}</option>
              )}
            </select>
          </form>

          <h1>Kies je profielfoto </h1>
          <ProfilePictureList pictureList={this.props.profilePictureList} click={this.pictureOnClick}/>

          <Link to="/search">
            <input
              className="button--login"
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
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeUserTravelTo: changeUserTravelTo,
  changeUserTravelFrom: changeUserTravelFrom,
  changeProfilePictureList: changeProfilePictureList,
})(SetUpAccount);
