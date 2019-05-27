import React, {Component} from "react";
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

  //bekijken van de gebruikers in een browser
  getUsers = _ => {
    fetch('http://localhost:4000/users')
      .then(response => this.setState({inputEmail: "", inputWachtwoord: "",inputGebruikersnaam: "", inputNaam:"" }))
        .catch(err => console.error(err))
  }

  //toevoegen van users aan de accounts tabel via een url
  addUsers = _ =>{
    fetch(`http://localhost:4000/users/add?username=${this.state.inputGebruikersnaam}&name=${this.state.inputNaam}&email=${this.state.inputEmail}&password=${this.state.inputWachtwoord}`)
      .then(this.getUsers)
      .catch(err => console.error(err))
  }

  renderUser = ({name, email}) => <div key={name}>{email}</div>

  //check of de invoervelden aan de voorwaarden voldoen, zodat een veld niet leeg kan zijn
  valideerInput(){
    return this.state.inputEmail.length > 0 && this.state.inputWachtwoord.length > 4 &&this.state.inputGebruikersnaam.length > 3 && this.state.inputNaam.length > 1 ;
  };

  //zet de juiste state-informatie naar de waarde van het invoerveld
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
 // ervoor zorgen dat de informatie niet verdwijnt als de pagina ververst
  onSubmit = event => {
    event.preventDefault();

}

  //geef de pagina terug
  render(){
    return(
      <div className="login">
        <form onSubmit={this.onSubmit}>
        <div className="formgroup" id="naam" >
          <label>Naam</label>
          <input
            autoFocus
            type="text"
            value={this.state.inputNaam}
            onChange={this.onChangeName} />
        </div>
          <div className="formgroup" id="gebruikersnaam" >
            <label>Gebruikersnaam</label>
            <input
              autoFocus
              type="text"
              value={this.state.inputGebruikersnaam}
              onChange={this.onChangeUser} />
          </div>
          <div className="formgroup" id="email" >
            <label>E-mailadres</label>
            <input
              autoFocus
              type="email"
              value={this.state.inputEmail}
              onChange={this.onChangeEmail} />
          </div>
          <div className="formgroup" id="wachtwoord" >
            <label>Wachtwoord</label>
            <input
              value={this.state.inputWachtwoord}
              onChange={this.onChangePass}
              type="password" />
          </div>
          <input
            className="button"
            disabled={!this.valideerInput()}
            type="submit"
            value="Registreer"
            onClick={this.addUsers}
          />
        </form>

        <Link to="/search">Doorgaan</Link>
      </div>
    );
  }
}
