import React from 'react';
import {Link} from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import TopBar from '../layout/TopBar';

import './Login.css';

class Login extends React.Component{
  render() {
    return(
      <div>
        <TopBar />
        <div className="LoginPageContainer">
          <form className="form">
            <div className="containerFormItem" id="gebruikersnaam" >
              <label className="label">Gebruikersnaam</label>
              <input className="inputGebruikersnaam" autoFocus type="text" />
            </div>
            <div className="containerFormItem" id="wachtwoord" >
              <label className="label">Wachtwoord</label>
              <input className="inputWachtwoord" type="password" />
            </div>
            <div>
              <input className="loginButton" type="submit" value="Login" />
            </div>
          </form>
          <Link to="/search">Doorgaan </Link>
        </div>
      </div>
    )
  }
}

export default Login;
