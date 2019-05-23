import React from 'react';
import Matches from '../matches/Matches';
import SearchBar from '../matches/SearchBar';
import axios from "axios";

class Search extends React.Component{
  state = { matches:{} };

  onSubmit = searchTerm => {
    const base_url = "http://localhost:8000/api/match/";
    const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

    axios.get(base_url + searchTerm + api_token).then(res => {
      let matches = res.data;
      this.setState({matches: {matches}})
    });
  };

  render(){
    return(
      <div>
        <h1>Zoek</h1>
        <SearchBar onSearch={this.onSubmit}></SearchBar>
        <Matches matches={this.state.matches}></Matches>
      </div>

    )
  }
}

export default Search;
