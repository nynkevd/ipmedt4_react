import React from 'react';
import {Link} from 'react-router-dom';

class LoginOrRegister extends React.Component{
  render(){
    return(
      <div className="Login">
        <h1>Login Of Registeren</h1>
        <Link to="/login">Inloggen</Link> <br />
        <Link to="/register">Nog geen account? Klik hier om te registreren.</Link>
      </div>
    )
  }
}

export default LoginOrRegister;
