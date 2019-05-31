import React from 'react';
import Matches from '../matches/Matches';
import SearchBar from '../matches/SearchBar';
import axios from "axios";

import BottomNav from '../layout/BottomNav';
import TopBar from '../layout/TopBar';

import './Search.css';
import {store} from "./store";
import {Provider} from "react-redux";
import {changeUserName} from "./actions";
import {connect} from "react-redux";

class Search extends React.Component{
  state = { matches:{} };

  componentDidMount(){
    this.onSubmit(this.props.username);
  }

  onSubmit = searchTerm => {
    const base_url = "http://136.144.230.97:8080/api/match/";
    const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

    axios.get(base_url + searchTerm + api_token).then(res => {
      let matches = res.data;
      this.setState({matches: {matches}})
    });
  };
// <SearchBar onSearch={this.onSubmit}></SearchBar>
  render(){
    return(
      <div>
        <TopBar />
        <div className="searchPageContainer">
          <h1>Welkom {this.props.username}</h1>
          <h3>Dit zijn jouw matches:</h3>

          <Matches matches={this.state.matches}></Matches>
        </div>
        <BottomNav />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {username: state.username};
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(Search);
//export default Search;
