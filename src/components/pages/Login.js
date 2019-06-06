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
  changeInputPasswordLogin
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import './Login.css';

//Hash wachtwoord
const md5 = require('md5');

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstLoggedInNumber: null,
      firstloggedin: true,
    }
  }

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
    this.getFL();
    return;
  }

  getFL(){
    axios.get(`http://136.144.230.97:4000/getfirstlogin?username=${this.props.userName}`)
      .then(response => (this.setState({firstLoggedInNumber: parseInt(response.data.data[0].firstlogin)})))
        .catch(err => console.error(err))
    this.checkFirstLogin();
  }

  //maak een constante die checkt of de firstlogin een waarde van 1 heeft.
  checkFirstLogin(){
    if(this.state.firstLoggedInNumber === 1){
      console.log("setupaccount");
      this.setState({firstloggedin: true});
    }
    if(this.state.firstLoggedInNumber === 0){
      console.log("search");
        this.setState({firstloggedin: false});
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
    return this.state.firstloggedin
      ?<div>
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
            <Link to="/setUpAccount">
              <input
                className="button--login"
                type="submit"
                value="Login"
                onClick={this.onSubmit}
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
      :<Redirect to="/setUpAccount" />
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
