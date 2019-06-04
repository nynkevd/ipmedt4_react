import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import ProfilePictureList from '../editAccount/ProfilePictureList';
import UserName from '../editAccount/UserName';
import ReisTraject from '../editAccount/ReisTraject';
import {Link} from 'react-router-dom';

import './AccountEdit.css';
import {store} from "./store";
import {Provider} from "react-redux";
import {changeUserName} from "./actions";
import {connect} from "react-redux";

import axios from "axios";

class AccountEdit extends React.Component{
  state = { profilePicture: "",  pictureList: [], travelFrom: "", travelTo: "", username: this.props.userName} // username moet aangepast worden naar het ingelogde account
  BASE_URL = "http://136.144.230.97:8080/api/";
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

  updateUserInfo = _ => {
    // fetch(`http://136.144.230.97:4000/userinfo/update?username=${this.state.username}&profilepicture=${this.state.profilePicture}`)
    // .then()
    var htmlCollection = document.getElementsByClassName("selected");
    var arr = Array.prototype.slice.call( htmlCollection );
    arr = arr[0];
    arr = arr.getAttribute('id');
    var newPicId = (parseInt(arr.toString().slice(-1)) + 1);

    this.setState({profilePicture: newPicId});
    console.log(this.state.profilePicture);

    fetch(`http://136.144.230.97:4000/userinfo/update?username=${this.state.username}&profilepicture=${this.state.profilePicture}`)
    .then(this.getUserInfo)
    .catch(err => console.error(err))

    console.log('gelukt');
  }

  getUserInfo = (pictureList) => {
    axios.get(this.BASE_URL + "userinfo/" + this.state.username + this.api_token).then(res => {
      this.setState({
        travelFrom: res.data.from,
        travelTo: res.data.to
      });

      // De huidige profielfoto wordt opgevraagd en meegegeven
      this.selectCurrentPicture(res.data.picture, pictureList);
    });
  }

  selectCurrentPicture = (picture, pictureList) => {
    // De huidige profielfoto wordt geselecteerd
    for(var i = 0; i < pictureList.length; i++){
      if(pictureList[i] === picture){
        var currentPicture = document.getElementById("profilePicture" + i);
        currentPicture.classList.add("selected");
        this.setState({profilePicture: i});
      }
    }
  }

  onUsernameChange = (username) =>{
    this.setState({username: username})
  }

  setFrom = (event) => {
    if(event.target.value != this.state.travelTo){
      this.setState({travelFrom: event.target.value});
      document.getElementById("fromErrorMessage").classList.add("hideErrorMessage");
    }else{
      //geef error message
      document.getElementById("fromErrorMessage").classList.remove("hideErrorMessage");
    }

  }

  setTo = (event) => {
    if(event.target.value != this.state.travelFrom){
      this.setState({travelTo: event.target.value});
      document.getElementById("toErrorMessage").classList.add("hideErrorMessage");
    }else{
      //geef error message
      document.getElementById("toErrorMessage").classList.remove("hideErrorMessage");
    }
  }

  //Later toevoegen:
  // <UserName username={this.state.username} onSubmit={this.onUsernameChange}/>
  // <ReisTraject from={this.state.travelFrom} to={this.state.travelTo} setFrom={this.setFrom} setTo={this.setTo}/>


  render(){
    return(
      <div>
        <TopBar />
        <div className="accountEditPageContainer">
          <h1>Edit account</h1>

          <ProfilePictureList pictureList={this.state.pictureList} click={this.pictureOnClick}/>

          <UserName username={this.state.username} onSubmit={this.onUsernameChange}/>

          <button className="button" onClick={this.updateUserInfo}> Bevestig </button>
          <Link to="/account"> <p> Terug naar account </p> </ Link>
        </div>
        <BottomNav />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {userName: state.userName};
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(AccountEdit);

//export default AccountEdit;
