//React en benodigheden importeren
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeCheckPassword,
  changeInputPasswordLogin
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import './Login.css';

//Hash wachtwoord
const md5 = require('md5');

class Login extends React.Component{

  getUserInfoFromDatabase = _ => {
    //Checken van ingevoerde wachtwoord met de database
    axios.get(`http://136.144.230.97:4000/login?username=${this.props.userName}`)
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
    this.props.changeUserName(event.target.value);
    if(this.props.checkPassword === md5(this.props.inputPasswordLogin)){
      console.log('gelijk');
    } else{
      console.log('mislukt');
    }
  }

  validatePasswordInput(){
    if(this.props.checkPassword === md5(this.props.inputPasswordLogin)){
      this.props.changeLoggedIn(true);
      return true;
    } else {
      this.props.changeLoggedIn(false);
      return false;
    }
  }

  render() {
    return(
      <div>
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
            <div>
            <Link to="/search">
              <input
                className="button--login"
                type="submit"
                value="Login"
                onClick={this.onClick}
                disabled={!this.validatePasswordInput()} />
            </Link>
            </div>
            <div className="containerFormItem">
              <p className="text text--noAccount">Nog geen account?</p>
              <Link to="/register" className="text text--register">Klik hier om te registreren</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
    checkPassword: state.checkPassword,
    inputPasswordLogin: state.inputPasswordLogin,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
  changeCheckPassword: changeCheckPassword,
  changeInputPasswordLogin: changeInputPasswordLogin,
})(Login);
