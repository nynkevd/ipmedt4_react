import React, {Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css"

export default class Login extends Component{
  constructor(props){
    super(props);

    // declareer de state -> kan elke keer veranderd worden voor een nieuwe gebruiker
    this.state = {
      email: "",
      wachtwoord: "",
      gebruikersnaam: "",
    };
  }

  valideerInput(){
    return this.state.email.length > 0 && this.state.wachtwoord.length > 4 &&this.state.gebruikersnaam.length > 1;
  }

  onChange = event =>{
    this.setState({
      [event.target.id]: event.target.value
    });
  }
 // ervoor zorgen dat de info niet verdwijnt als de pagina ververst
  onSubmit = event => {
    event.preventDefault();

    try {
       Auth.signIn(this.state.gebruikersnaam, this.state.email, this.state.wachtwoord);
          alert("Ingelogd!");
    } catch (e) {
      alert(e.message);
  }
}

  //elke klasse een renderfunctie
  render(){
    return(
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <FormGroup className="formgroup" controlId="gebruikersnaam" bsSize="large">
            <label>Gebruikersnaam</label>
            <FormControl
              autoFocus
              type="text"
              value={this.state.gebruikersnaam}
              onChange={this.onChange} />
          </FormGroup>
          <FormGroup className="formgroup" controlId="email" bsSize="large">
            <label>E-mailadres</label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.onChange} />
          </FormGroup>
          <FormGroup className="formgroup" controlId="wachtwoord" bsSize="large">
            <label>Wachtwoord</label>
            <FormControl
              value={this.state.wachtwoord}
              onChange={this.onChange}
              type="password" />
          </FormGroup>
          <Button
            className="button"
            block
            bsSize="large"
            disabled={!this.valideerInput()}
            type="submit"
          > Login </Button>
        </form>
      </div>
    );
  }
}
