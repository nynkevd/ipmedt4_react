import React from 'react';
import {Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';

import TopBar from '../layout/TopBar';

import './Login.css';
const md5 = require('md5');

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      inputGebruikersnaam: "",
      inputWachtwoord: "",
      checkWachtwoord: "",
    }
  }

  componentDidMount(){
    this.getInfo();
  }

  getInfo = _ => {
    axios.get(`http://localhost:4000/login?username=${this.state.inputGebruikersnaam}`)
      .then(response => this.setState({checkWachtwoord: response.data.data[0].password}))
        .catch(err => console.error(err))
  }

  onChangeUserName = event =>{
    this.setState({
      inputGebruikersnaam: event.target.value
    });
  }
  onChangePassword = event =>{
    this.setState({
      inputWachtwoord: event.target.value
    });
  }
   valideerInput(){
     //ophalen wachtwoord uit database
     //bekijken wachtwoordinput veld
     //vergelijken van de hashwaardes van de wachtwoorden
     //als het gelijk is dan mag je inloggen, alert ingelogd
     // console.log(md5('hallo'));
   };

   onSubmit = event => {
     event.preventDefault();
     this.getInfo();
     if(this.state.checkWachtwoord == this.state.inputWachtwoord){
       console.log('gelijk');
     }
     else{
       console.log('mislukt');
     }
 }

  render() {
    return(
      <div>
        <TopBar />
        <div className="LoginPageContainer">
          <form onSubmit={this.onSubmit} className="form">
            <div className="containerFormItem" id="gebruikersnaam" >
              <label className="label">Gebruikersnaam</label>
              <input
                className="inputGebruikersnaam"
                autoFocus
                type="text"
                value={this.state.inputGebruikersnaam}
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
              <input className="loginButton" type="submit" value="Login"  />
            </div>
          </form>
          <Link to="/search">Doorgaan </Link>
        </div>
      </div>
    );
  }
}

export default Login;
