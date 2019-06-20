//React en benodigheden importeren
import React from "react";
import axios from "axios";
//Redux importeren
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import MyInterests from '../editInterests/MyInterests';
//CSS importeren
import './InterestsEdit.css';

class InterestsEdit extends React.Component {
  state = { myInterests:[]}
  BASE_URL = "https://api.ovtravelbuddy.nl/api/interests/";
  TEMP_URL = "localhost:8000/api/interests/"
  username = "Dayella"; //Moet aangepast worden naar de ingelogde gebruiker
  api_token = process.env.REACT_APP_API_TOKEN;

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
      </div>
    </div>
  )}

}

export default InterestsEdit;
