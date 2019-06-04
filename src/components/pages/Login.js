import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Chatkit from '@pusher/chatkit-client';

import TopBar from '../layout/TopBar';

//redux
import {connect} from "react-redux";
import {changeUserName} from "./actions";

import './Login.css';
const md5 = require('md5');

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      // inputGebruikersnaam: "",
      inputWachtwoord: "",
      checkWachtwoord: "",
    }
  }

  componentDidMount(){
    this.getInfo();
  }

  getInfo = _ => {
    axios.get(`http://136.144.230.97:4000/login?username=${this.props.username}`)
      .then(response => this.setState({checkWachtwoord: response.data.data[0].password}))
        .catch(err => console.error(err))
  }

  onChangeUserName = event =>{
    // this.setState({
    //   inputGebruikersnaam: event.target.value
    // });
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
      const userId = this.props.username;
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
    return(this.state.checkWachtwoord === md5(this.state.inputWachtwoord));
  }

  render() {
    console.log(this.props.username);
    return(
      <div>
        <TopBar />
        <div className="LoginPageContainer">
          <form onSubmit={this.onSubmit} className="formLogin">
            <div className="containerFormItem" id="gebruikersnaam" >
              <label className="label">Gebruikersnaam</label>
              <input
                className="inputGebruikersnaam"
                autoFocus
                type="text"
                value={this.props.username}
                onChange={this.onChangeUserName} />
            </div>
            <div className="containerFormItem" id="wachtwoord" >
              <label className="label">Wachtwoord</label>
              <input
                className="inputWachtwoord"
                type="password"
                value={this.state.inputWachtwoord}
                onChange={this.onChangePassword} />
            </div>
            <div>
            <Link to="/search">
              <input
                className="loginButton"
                type="submit"
                value="Login"
                onClick={this.onClick}
                disabled={!this.valideerInput()} />
            </Link>
            </div>
            <div className="containerFormItem">
              <p className="textNoAccount">Nog geen account?</p>
              <Link to="/register" className="linkRegister">Klik hier om te registreren</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{username: state.username};
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(Login);

// export default Login;
