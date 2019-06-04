//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
//Redux importeren
import { store } from "./store";
import { Provider, connect } from "react-redux";
import { changeUserName, changeLoggedIn } from "./actions";
//Eigen componenten importeren
import BottomNav from '../layout/BottomNav';
import TopBar from '../layout/TopBar';
import Matches from '../matches/Matches';
//CSS importeren
import './Search.css';

class Search extends React.Component{
  state = { matches:{} };

  componentDidMount(){
    this.onSubmit(this.props.username);
    //Kijken of er ingelogd is
    if(this.props.username !== ""){
      this.props.changeLoggedIn(true);
    } else {
      this.props.changeLoggedIn(false);
    }
  }

  onSubmit = searchTerm => {
    const base_url = "http://136.144.230.97:8080/api/match/";
    const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
    //Matches ophalen
    axios.get(base_url + searchTerm + api_token).then(res => {
      let matches = res.data;
      this.setState({matches: {matches}})
    });
  };

  render(){
    return this.props.loggedIn
    ? <div>
        <TopBar />
        <div className="searchPageContainer">
          <h1>Welkom {this.props.username}</h1>
          <h3>Dit zijn jouw matches:</h3>

          <Matches matches={this.state.matches}></Matches>
        </div>
        <BottomNav />
      </div>
    //Naar de login pagina sturen als er niet ingelogd is
    : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    username: state.username,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
})(Search);
