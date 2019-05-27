import React, {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Register.css"
import {Link} from 'react-router-dom';

export default class Register extends Component{

  constructor(props){
    super(props);

    // declareer de state -> kan elke keer veranderd worden voor een nieuwe gebruiker
    this.state = {
      inputEmail: "",
      inputWachtwoord: "",
      inputGebruikersnaam: "",
      inputNaam: "",
    }
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers = _ => {
    fetch('http://localhost:4000/users')
      .then(response => this.setState({inputEmail: "", inputWachtwoord: "",inputGebruikersnaam: "", inputNaam:"" }))
        .catch(err => console.error(err))
  }

  addUsers = _ =>{
    fetch(`http://localhost:4000/users/add?username=${this.state.inputGebruikersnaam}&name=${this.state.inputGebruikersnaam}&email=${this.state.inputEmail}&password=${this.state.inputWachtwoord}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
  }

  renderUser = ({name, email}) => <div key={name}>{email}</div>

  valideerInput(){
    return this.state.inputEmail.length > 0 && this.state.inputWachtwoord.length > 4 &&this.state.inputGebruikersnaam.length > 3 && this.state.inputNaam.length > 1 ;
  };

  onChangeName = event =>{
    this.setState({
      inputNaam: event.target.value
    });
  }
  onChangeEmail = event =>{
    this.setState({
      inputEmail: event.target.value
    });
  }
  onChangeUser = event =>{
    this.setState({
      inputGebruikersnaam: event.target.value
    });
  }
  onChangePass = event =>{
    this.setState({
      inputWachtwoord: event.target.value
    });
  }
 // ervoor zorgen dat de info niet verdwijnt als de pagina ververst
  onSubmit = event => {
    event.preventDefault();

  //   try {
  //      Auth.signIn(this.state.inputGebruikersnaam, this.state.inputEmail, this.state.inputWachtwoord);
  //      alert("Ingelogd!");
  //   } catch (e) {
  //     alert(e.message);
  // }
}

  //elke klasse een renderfunctie
  render(){
    return(
      <div className="login">
        <form onSubmit={this.onSubmit}>
        <FormGroup className="formgroup" controlId="naam" >
          <label>Naam</label>
          <FormControl
            autoFocus
            type="text"
            value={this.state.inputNaam}
            onChange={this.onChangeName} />
        </FormGroup>
          <FormGroup className="formgroup" controlId="gebruikersnaam" >
            <label>Gebruikersnaam</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.inputGebruikersnaam}
              onChange={this.onChangeUser} />
          </FormGroup>
          <FormGroup className="formgroup" controlId="email" >
            <label>E-mailadres</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.inputEmail}
              onChange={this.onChangeEmail} />
          </FormGroup>
          <FormGroup className="formgroup" controlId="wachtwoord" >
            <label>Wachtwoord</label>
            <FormControl
              value={this.state.inputWachtwoord}
              onChange={this.onChangePass}
              type="password" />
          </FormGroup>
          <Button
            className="button"
            block
            disabled={!this.valideerInput()}
            type="submit"
            onClick={this.addUsers}
          > Registreer </Button>
        </form>

        <Link to="/search">Doorgaan</Link>
      </div>
    );
  }
}
