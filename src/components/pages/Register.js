//React en benodigheden importeren
import React from "react";
import { Link } from 'react-router-dom';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
//Redux importeren
import {connect} from "react-redux";
import {
  changeInputUserName,
  changeInputName,
  changeInputEmail,
  changeInputPassword
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
//CSS importeren
import "./Register.css"

class Register extends React.Component{

  componentDidMount(){
    this.setUserValuesToEmpty();
  }

  //Zet de values van de user leeg
  setUserValuesToEmpty = _ => {
    this.props.changeInputName("");
    this.props.changeInputUserName("");
    this.props.changeInputEmail("");
    this.props.changeInputPassword("");
  }

  //Toevoegen van user aan de accounts tabel via een url
  addUserToDatabase = _ =>{
    this.addUserToChatkit(this.props.inputUserName);
    fetch(`http://136.144.230.97:4000/users/add?username=${this.props.inputUserName}&name=${this.props.inputName}&email=${this.props.inputEmail}&password=${this.props.inputPassword}`)
      .then(this.setUserValuesToEmpty)
      .catch(err => console.error(err))
  }

  //User toevoegen aan Chatkit
  addUserToChatkit = user => {
    const userId = user;

    if (userId === null || userId.trim() === '') {
      alert('Invalid userId');
    }

    axios.post('http://localhost:5200/users', { userId }).then(() => {
      const tokenProvider = new Chatkit.TokenProvider({
        url: 'http://localhost:5200/authenticate',
      });
    });
  }

  //Check of de invoervelden aan de voorwaarden voldoen, zodat een veld niet leeg kan zijn
  validateInputFields(){
    return this.props.inputEmail.length > 0 && this.props.inputPassword.length > 4 &&this.props.inputUserName.length > 3 && this.props.inputName.length > 1 ;
  };

  //Zet de juiste state-informatie naar de waarde van het invoerveld
  onChangeName = event =>{
    this.props.changeInputName(event.target.value);
  }

  onChangeEmail = event =>{
    this.props.changeInputEmail(event.target.value);
  }

  onChangeUser = event =>{
    this.props.changeInputUserName(event.target.value);
  }

  onChangePassword = event =>{
    this.props.changeInputPassword(event.target.value);
  }

  //Ervoor zorgen dat de informatie niet verdwijnt als de pagina ververst
  onSubmit = event => {
    event.preventDefault();
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="registerPageContainer">
          <form className="formRegister" onSubmit={this.onSubmit}>
            <div className="containerFormItem" >
              <label className="label">Naam</label>
              <input
                className="input input--name"
                autoFocus
                type="text"
                value={this.props.inputName}
                onChange={this.onChangeName} />
            </div>
            <div className="containerFormItem" >
              <label className="label">Gebruikersnaam</label>
              <input
                className="input input--username"
                type="text"
                value={this.props.inputUserName}
                onChange={this.onChangeUser} />
            </div>
            <div className="containerFormItem" >
              <label className="label">E-mailadres</label>
              <input
                className="input input--email"
                type="email"
                value={this.props.inputEmail}
                onChange={this.onChangeEmail} />
            </div>
            <div className="containerFormItem" >
              <label className="label">Wachtwoord</label>
              <input
                className="input input--password"
                value={this.props.inputPassword}
                onChange={this.onChangePassword}
                type="password" />
            </div>
            <Link to="/search">
              <input
                className="button"
                disabled={!this.validateInputFields()}
                type="submit"
                value="Registreer"
                onClick={this.addUserToDatabase}
              />
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    inputUserName: state.inputUserName,
    inputName: state.inputName,
    inputEmail: state.inputEmail,
    inputPassword: state.inputPassword,
  };
}

export default connect(mapStateToProps,{
  changeInputUserName: changeInputUserName,
  changeInputName: changeInputName,
  changeInputEmail: changeInputEmail,
  changeInputPassword: changeInputPassword,
})(Register);
