import React from 'react';
import {Link} from 'react-router-dom';

import TopBar from '../layout/TopBar';

import './Login.css';

class Login extends React.Component{
  render() {
    return(
      <div>
        <TopBar />
        <div className="LoginPageContainer">
          <form className="formLogin">
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
            <div className="containerFormItem">
              <p className="textNoAccount">Nog geen account?</p>
              <Link to="/register" className="linkRegister">Klik hier om te registreren</Link>
            </div>
          </form>
          <Link to="/search">Doorgaan </Link>
        </div>
      </div>
    )
  }
}

export default Login;
