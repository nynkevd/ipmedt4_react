import React from 'react';
import Matches from '../matches/Matches';
import SearchBar from '../matches/SearchBar';
import axios from "axios";

import BottomNav from '../layout/BottomNav';
import TopBar from '../layout/TopBar';

import './Search.css';

class Search extends React.Component{
  state = { matches:{} };

  onSubmit = searchTerm => {
    const base_url = "http://136.144.230.97:8080/api/match/";
    const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

    axios.get(base_url + searchTerm + api_token).then(res => {
      let matches = res.data;
      this.setState({matches: {matches}})
    });
  };

  render(){
    return(
      <div>
        <TopBar />
        <div className="searchPageContainer">
          <h1>Zoek</h1>
          <SearchBar onSearch={this.onSubmit}></SearchBar>
          <Matches matches={this.state.matches}></Matches>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Search;
