//React en benodigheden importeren
import React, {Component} from "react";
import {Link} from 'react-router-dom';
//Redux importeren
import {connect} from "react-redux";
import {
  changeInputUserName,
  changeInputName,
  changeInputEmail,
  changeInputPassword
} from "./actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import "./Register.css"

class Register extends Component{

  componentDidMount(){
    this.getUsers();
  }

  //set de values leeg
  getUsers = _ => {
    this.props.changeInputName("");
    this.props.changeInputUserName("");
    this.props.changeInputEmail("");
    this.props.changeInputPassword("");
    }

  //toevoegen van users aan de accounts tabel via een url
  addUsers = _ =>{
    fetch(`http://136.144.230.97:4000/users/add?username=${this.props.inputUserName}&name=${this.props.inputName}&email=${this.props.inputEmail}&password=${this.props.inputPassword}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
  }

  renderUser = ({name, email}) => <div key={name}>{email}</div>

  //check of de invoervelden aan de voorwaarden voldoen, zodat een veld niet leeg kan zijn
  valideerInput(){
    return this.props.inputEmail.length > 0 && this.props.inputPassword.length > 4 &&this.props.inputUserName.length > 3 && this.props.inputName.length > 1 ;
  };

  //zet de juiste state-informatie naar de waarde van het invoerveld
  onChangeName = event =>{
    this.props.changeInputName(event.target.value);
  }
  onChangeEmail = event =>{
    this.props.changeInputEmail(event.target.value);
  }
  onChangeUser = event =>{
    this.props.changeInputUserName(event.target.value);
  }
  onChangePass = event =>{
    this.props.changeInputPassword(event.target.value);
  }
 // ervoor zorgen dat de informatie niet verdwijnt als de pagina ververst
  onSubmit = event => {
    event.preventDefault();

}

  //geef de pagina terug
  render(){
    return(
      <div>
        <TopBar />
        <div className="registerPageContainer">
          <form className="formRegister" onSubmit={this.onSubmit}>
            <div className="containerFormItem" id="naam" >
              <label className="label">Naam</label>
              <input
                className="inputNaam"
                autoFocus
                type="text"
                value={this.props.inputName}
                onChange={this.onChangeName} />
            </div>
            <div className="containerFormItem" id="gebruikersnaam" >
              <label className="label">Gebruikersnaam</label>
              <input
                className="inputGebruikersnaam"
                type="text"
                value={this.props.inputUserName}
                onChange={this.onChangeUser} />
            </div>
            <div className="containerFormItem" id="email" >
              <label className="label">E-mailadres</label>
              <input
                className="inputEmail"
                type="email"
                value={this.props.inputEmail}
                onChange={this.onChangeEmail} />
            </div>
            <div className="containerFormItem" id="wachtwoord" >
              <label className="label">Wachtwoord</label>
              <input
                className="inputWachtwoord"
                value={this.props.inputPassword}
                onChange={this.onChangePass}
                type="password" />
            </div>
            <Link to="/search">
              <input
                className="button"
                disabled={!this.valideerInput()}
                type="submit"
                value="Registreer"
                onClick={this.addUsers}
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
