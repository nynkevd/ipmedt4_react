//React en benodigheden importeren
import React from "react";
import { Link } from 'react-router-dom';
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
import "./Register.css";

//Arrays voor het controleren van al gebruiker usernames en emails
var takenUserNames = [];
var takenEmails = [];

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
    fetch(`https://dataserver.ovtravelbuddy.nl/users/add?username=${this.props.inputUserName}&name=${this.props.inputName}&email=${this.props.inputEmail}&password=${this.props.inputPassword}`)
      .then(this.setUserValuesToEmpty)
      .catch(err => console.error(err))
  }

  //User toevoegen aan Chatkit
  addUserToChatkit = user => {
    const userId = user;

    console.log(userId);

    axios
      .post('https://chatserver.ovtravelbuddy.nl/users', { userId })
      .then(() => {console.log("Chatkit User geregistreerd")})
  }

  //Check of de invoervelden aan de voorwaarden voldoen, zodat een veld niet leeg kan zijn
  validateInputFields(){
    return this.props.inputEmail.length > 0 && this.props.inputPassword.length > 4 &&this.props.inputUserName.length > 3 && this.props.inputName.length > 1 ;
  };

  //Opvragen van alle usernames voor error messages
  getAllTakenUserNames = () => {
    axios.get(`https://dataserver.ovtravelbuddy.nl/users`).then(res => {
      var lengthArrayUsers = (res.data.data).length;
      for(var i=0; i<lengthArrayUsers; i++){
        //Alle usernames in een array zetten
        takenUserNames.push(res.data.data[i].username);
      }
    })
  }

  //Opvragen van alle emails voor error messages
  getAllTakenEmails = () => {
    axios.get(`https://dataserver.ovtravelbuddy.nl/users`).then(res => {
      var lengthArrayUsers = (res.data.data).length;
      takenEmails = [];
      for(var i=0; i<lengthArrayUsers; i++){
        //Alle emails in een array zetten
        takenEmails.push(res.data.data[i].email);
      }
    })
  }

  //Zet de juiste state-informatie naar de waarde van het invoerveld
  onChangeName = event =>{
    this.props.changeInputName(event.target.value);
  }

  onChangeEmail = event =>{
    this.getAllTakenEmails();
    for(var i=0; i<takenEmails.length; i++){
      if(event.target.value === takenEmails[i]){
        //Error messages tonen als de email al gebruikt wordt
        document.getElementById("emailErrorMessage").classList.remove("hideErrorMessageRegister");
        break;
      } else {
        document.getElementById("emailErrorMessage").classList.add("hideErrorMessageRegister");
      }
    }
    this.props.changeInputEmail(event.target.value.toLowerCase());
  }

  onChangeUser = event =>{
    this.getAllTakenUserNames();
    for(var i=0; i<takenUserNames.length; i++){
      if(event.target.value === takenUserNames[i]){
        //Error messages tonen als de username al gebruikt wordt
        document.getElementById("userNameErrorMessage").classList.remove("hideErrorMessageRegister");
        break;
      } else {
        document.getElementById("userNameErrorMessage").classList.add("hideErrorMessageRegister");
      }
    }
    this.props.changeInputUserName(event.target.value.toLowerCase());
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
              <label className="errorMessageRegister hideErrorMessageRegister" id="userNameErrorMessage">Deze gebruikersnaam is al in gebruik</label>
            </div>
            <div className="containerFormItem" >
              <label className="label">E-mailadres</label>
              <input
                className="input input--email"
                type="email"
                value={this.props.inputEmail}
                onChange={this.onChangeEmail} />
              <label className="errorMessageRegister hideErrorMessageRegister" id="emailErrorMessage">Dit e-mailadres is al in gebruik</label>
            </div>
            <div className="containerFormItem" >
              <label className="label">Wachtwoord</label>
              <input
                className="input input--password"
                value={this.props.inputPassword}
                onChange={this.onChangePassword}
                type="password" />
            </div>
            <Link to="/login">
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
