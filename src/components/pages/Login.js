//React en benodigheden importeren
import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeCheckPassword,
  changeInputPasswordLogin,
  changeAllStations,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import './Login.css';

//Hash wachtwoord
const md5 = require('md5');
//Variable om bij te houden of er een error is
var error = null;
const api_token = process.env.REACT_APP_API_TOKEN;

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstLoggedInNumber: null,
      firstloggedin: true,
    }
  }

  componentDidMount(){
    this.showHideErrorMessage();
    //De uitlog knop op display none zetten
    document.getElementById("link").classList.add("topBar__link--hidden");
    this.setAllStations();
  }

  setAllStations = _ => {
    axios.get(`https://api.ovtravelbuddy.nl/api/stations` + api_token)
    .then(res => {
      this.props.changeAllStations(res.data);
    })
    .catch(err => console.error(err));
  }

  getUserInfoFromDatabase = _ => {
    //Checken van ingevoerde wachtwoord met de database
    axios.get(`https://dataserver.ovtravelbuddy.nl/login?username=${this.props.userName}`)
      .then(response => this.props.changeCheckPassword(response.data.data[0].password))
        .catch(err => console.error(err))
  }

  onChangeUserName = event =>{
    this.props.changeUserName(event.target.value);
  }

  onChangePassword = event =>{
    this.getUserInfoFromDatabase();
    this.props.changeInputPasswordLogin(event.target.value);
  }

  onSubmit = event => {
    event.preventDefault();
    this.getFirstLoginFromUser();
    this.validatePasswordInput();
  }

  getFirstLoginFromUser(){
    axios.get(`https://dataserver.ovtravelbuddy.nl/getfirstlogin?username=${this.props.userName}`)
      .then(response => (this.setState({firstLoggedInNumber: parseInt(response.data.data[0].first_login)})))
        .catch(err => console.error(err))
    this.checkValueFirstLogin();
  }

  //maak een constante die checkt of de firstlogin een waarde van 1 heeft.
  checkValueFirstLogin(){
    if(this.state.firstLoggedInNumber === 1){
      //Het is de eerste keer dat de gebruiker inlogt
      this.setState({firstloggedin: true});
      return <Redirect to='/setUpAccount' />
    }
    else if(this.state.firstLoggedInNumber === 0){
      //De gebruiker heeft al eerder ingelogd
      this.setState({firstloggedin: false});
    }
  }

  validatePasswordInput(){
    if(this.props.checkPassword === md5(this.props.inputPasswordLogin)){
      this.props.changeLoggedIn(true);
      error = false;
      return true;
    } else {
      this.props.changeLoggedIn(false);
      error = true;
      return false;
    }
  }

  //Error message tonen als de gebruikersnaam/wachtwoord onjuist is
  showHideErrorMessage(){
    if(error){
      document.getElementById("loginErrorMessage").classList.remove("hideErrorMessageLogin");
      this.props.changeInputPasswordLogin("");
    } else{
      document.getElementById("loginErrorMessage").classList.add("hideErrorMessageLogin");
    }
  }

  render() {
    return this.state.firstloggedin
      ? <div>
        <TopBar />
        <div className="LoginPageContainer">
          <form onSubmit={this.onSubmit} className="form--login">
            <div className="form__item" id="gebruikersnaam" >
              <label className="label">Gebruikersnaam</label>
              <input
                className="input"
                autoFocus
                type="text"
                value={this.props.userName}
                onChange={this.onChangeUserName} />
            </div>
            <div className="form__item" id="wachtwoord" >
              <label className="label">Wachtwoord</label>
              <input
                className="input"
                type="password"
                value={this.props.inputPasswordLogin}
                onChange={this.onChangePassword} />
            </div>
            {this.checkValueFirstLogin()}
              <input
                className="button--login"
                type="submit"
                value="Login"
                onClick={this.onSubmit}/>
            <label className="errorMessageLogin hideErrorMessageLogin" id="loginErrorMessage">De gebruikersnaam of wachtwoord is onjuist</label>
            <div className="containerFormItem">
              <p className="text text--noAccount">Nog geen account?</p>
              <Link to="/register" className="text text--register">Klik hier om te registreren</Link>
            </div>
          </form>
        </div>
      </div>
      //naar de search als je niet voor de eerste keer inlogt
      : <Redirect to="/search" />
  }
}

const mapStateToProps = state =>{
  return{
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    checkPassword: state.checkPassword,
    inputPasswordLogin: state.inputPasswordLogin,
    allStations: state.allStations,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeCheckPassword: changeCheckPassword,
  changeInputPasswordLogin: changeInputPasswordLogin,
  changeAllStations: changeAllStations,
})(Login);
