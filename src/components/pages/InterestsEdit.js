import React from "react";

import TopBar from '../layout/TopBar';
import MyInterests from '../editInterests/MyInterests';
import SearchBarInterests from '../editInterests/SearchBarInterests'

import './InterestsEdit.css';

import axios from "axios";

class InterestsEdit extends React.Component {
  state = { myInterests:[]}
  BASE_URL = "http://136.144.230.97:8080/api/interests/";
  TEMP_URL = "localhost:8000/api/interests/"
  username = "Dayella"; //Moet aangepast worden naar de ingelogde gebruiker
  api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

  componentDidMount(){
    this.getUserInterests();
  }

  getUserInterests = () => {
    //Lijst van de huidige interesses opvragen
    axios.get(this.BASE_URL + this.username + this.api_token).then(res =>{
      console.log(res);
      this.setState({myInterests: res.data})
    })
  }

  render(){
    return(
    <div>
      <TopBar />
      <div className="interestPageContainer">
        <h1> Mijn interesses </h1>
        <MyInterests className="myinterests" interests={this.state.myInterests}> </ MyInterests>
        <SearchBarInterests onSubmit={this.onSearch} > </SearchBarInterests>
      </div>
    </div>
  )}

}

export default InterestsEdit;
