import React from 'react';
import {Link} from 'react-router-dom';

class Register extends React.Component{
  render(){
    return(
      <div>
        <h1>Registreren</h1>
        <Link to="/search">Registreren</Link>
      </div>
    )
  }
}

export default Register;
