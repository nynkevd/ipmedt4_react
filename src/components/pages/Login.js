//React en benodigheden importeren
import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import {connect} from "react-redux";
import {changeUserName, changeLoggedIn} from "./actions";
//Eigen componeten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import './Login.css';

//Hash wachtwoord
const md5 = require('md5');

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      inputWachtwoord: "",
      checkWachtwoord: "",
    }
  }

  componentDidMount(){
    this.getInfo();
  }

  getInfo = _ => {
    //Checken van ingevoerde wachtwoord met de database
    axios.get(`http://136.144.230.97:4000/login?username=${this.props.username}`)
      .then(response => this.setState({checkWachtwoord: response.data.data[0].password}))
        .catch(err => console.error(err))
  }

  onChangeUserName = event =>{
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
  valideerInput(){
    if(this.state.checkWachtwoord === md5(this.state.inputWachtwoord)){
      this.props.changeLoggedIn(true);
      return true;
    } else {
      this.props.changeLoggedIn(false);
      return false;
    }
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
  return{
    username: state.username,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
})(Login);
