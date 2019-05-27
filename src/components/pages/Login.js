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
          
          </form>
          <Link to="/search">Doorgaan </Link>
        </div>
      </div>
    )
  }
}

export default Login;
