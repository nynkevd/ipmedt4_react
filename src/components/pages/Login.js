import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component{
  render(){
    return(
      <div className="LoginPage">
        <h1>Login</h1>
        <Link to="/search">Inloggen</Link> <br />
        <Link to="/register">Nog geen account? Klik hier om te registreren.</Link>
      </div>
    )
  }
}

export default Login;
