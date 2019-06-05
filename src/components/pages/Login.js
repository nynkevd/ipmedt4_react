//React en benodigheden importeren
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import {connect} from "react-redux";
import {changeUserName, changeLoggedIn} from "./actions";
//Eigen componeten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import './Login.css';

import Chatkit from '@pusher/chatkit-client';

//Hash wachtwoord
const md5 = require('md5');

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      inputWachtwoord: "",
      checkWachtwoord: "",
    }
  }

  componentDidMount(){
    this.getInfo();
  }

  getInfo = _ => {
    //Checken van ingevoerde wachtwoord met de database
    axios.get(`http://136.144.230.97:4000/login?username=${this.props.userName}`)
      .then(response => this.setState({checkWachtwoord: response.data.data[0].password}))
        .catch(err => console.error(err))
  }

  onChangeUserName = event =>{
    this.props.changeUserName(event.target.value);
  }
  onChangePassword = event =>{
    this.getInfo();
    this.setState({
      inputWachtwoord: event.target.value
    });
  }

   onSubmit = event => {
     event.preventDefault();
     this.getInfo();
     this.props.changeUserName(event.target.value);
     if(this.state.checkWachtwoord === md5(this.state.inputWachtwoord)){
       console.log('gelijk');
     }
     else{
       console.log('mislukt');
     }
 }

    onClick = event => {
      const userId = this.props.userName;
      console.log(userId);
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://136.144.230.97:5200/authenticate',
      });

      const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:a6e72788-6919-4ade-a86a-7beeaa73aa7d',
          userId,
          tokenProvider,
      });

      chatManager.connect().then(currentUser =>{
        console.log(currentUser);
      });
  }

  valideerInput(){
    if(this.state.checkWachtwoord === md5(this.state.inputWachtwoord)){
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
                value={this.state.inputWachtwoord}
                onChange={this.onChangePassword} />
            </div>
            <div>
            <Link to="/search">
              <input
                className="button--login"
                type="submit"
                value="Login"
                onClick={this.onClick}
                disabled={!this.valideerInput()} />
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
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
})(Login);
