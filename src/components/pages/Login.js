import React from 'react';
import {Link} from 'react-router-dom';
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
    this.getInfo();
    this.setState({
      inputWachtwoord: event.target.value
    });
  }

   onSubmit = event => {
     event.preventDefault();
     this.getInfo();
     if(this.state.checkWachtwoord === md5(this.state.inputWachtwoord)){
       console.log('gelijk');
     }
     else{
       console.log('mislukt');
     }
 }
  valideerInput(){
    return(this.state.checkWachtwoord === md5(this.state.inputWachtwoord));
  }

  render() {
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
            <Link to="/search">
              <input
                className="loginButton"
                type="submit"
                value="Login"
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

export default Login;
