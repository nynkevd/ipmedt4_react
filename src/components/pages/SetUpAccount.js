//React en benodigdheden importeren
import React from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import { connect } from 'react-redux';
import { changeUserName, changeLoggedIn } from "./../../actions";

class SetUpAccount extends React.Component{

  updateFirstLogin = _ => {
    //Updaten van de variabele firstlogin naar 0 -> false
    axios.get(`http://136.144.230.97:4000/updatefirstlogin?username=${this.props.userName}`)
        .catch(err => console.error(err))
  }

  render(){
    return this.props.loggedIn
      ? <div>
          <h1>Kies je interesses</h1>
          <br/>
          <h1>Kies je reistraject</h1>
          <br/>
          <h1>Kies je profielfoto </h1>
          <Link to="/search">
            <input
              className="button--login"
              type="submit"
              value="Opslaan"
              onClick={this.updateFirstLogin} />
          </Link>
        </div>
      //Naar de login pagina als een gebruiker niet is ingelogd
      : <Redirect to="/login" />
  };
}

const mapStateToProps = state =>{
  return{
    userName: state.userName,
    loggedIn: state.loggedIn
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
})(SetUpAccount);
