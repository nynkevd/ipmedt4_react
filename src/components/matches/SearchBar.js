import React from "react";

import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchTerm: ""};
  }

  onSearch = (event) => {
    this.setState({searchTerm: event.target.value.toLowerCase()})
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTerm);
  };

  render(){
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            className="searchbar"
            type="text"
            placeholder="Zoek hier je matches"
            value={this.state.searchTerm}
            onChange={this.onSearch}/>
        </form>
      </div>
    );
  }
}

export default SearchBar;
