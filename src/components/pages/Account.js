//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
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
  changeUserDisplayName,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import TravelRoute from '../account/TravelRoute';
//CSS importeren
import './Account.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;

class Account extends React.Component{

  componentDidMount(){
    this.getUserInfoFromApi(base_url, api_token);
    this.getUserInterestsFromApi(base_url, api_token);
    this.getTravelInfoFromDatabase();
  }

  //Userinfo ophalen van de API (profielfoto, van, naar, displayName)
  getUserInfoFromApi = (base_url, api_token) => {
    axios.get(base_url + "userinfo/" + this.props.userName + api_token).then(res => {
      this.props.changeUserProfilePicture(res.data.picture);
      // this.props.changeUserTravelFrom(res.data.from);
      // this.props.changeUserTravelTo(res.data.to);
      this.props.changeUserDisplayName(res.data.name);
    });
  }

  //Intresses ophalen van de API
  getUserInterestsFromApi = (base_url, api_token) => {
    axios.get(base_url + "interests/" + this.props.userName + api_token).then(res => {
      this.props.changeUserInterests(res.data);
    });
  }
//info ophalen uit de database en de van en naar vullen.
  getTravelInfoFromDatabase(){
    axios.get(`https://dataserver.ovtravelbuddy.nl/travelinfo?username=${this.props.userName}`)
      .then(res => {
        this.props.changeUserTravelTo(res.data.data[0].travel_to);
        this.props.changeUserTravelFrom(res.data.data[0].travel_from);
      })
        .catch(err => console.error(err))
  }

  render(){
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.props.userProfilePicture} naam={this.props.userDisplayName} />
          <TravelRoute from={this.props.userTravelFrom} to={this.props.userTravelTo} />
          <Interests interests={this.props.userInterests} />
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
    userInterests: state.userInterests,
    userProfilePicture: state.userProfilePicture,
    userTravelFrom: state.userTravelFrom,
    userTravelTo: state.userTravelTo,
    userDisplayName: state.userDisplayName,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeUserInterests: changeUserInterests,
  changeUserProfilePicture: changeUserProfilePicture,
  changeUserTravelFrom: changeUserTravelFrom,
  changeUserTravelTo: changeUserTravelTo,
  changeUserDisplayName: changeUserDisplayName,
})(Account);
