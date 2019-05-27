import React from 'react';
import ReactDOM from 'react-dom';

import "./SearchBarInterests.css";

class SearchBarInterests extends React.Component {
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
            className="searchbarInterests"
            type="text"
            placeholder="Voeg hier je interesses toe"
            value={this.state.searchTerm}
            onChange={this.onSearch}/>
        </form>
      </div>
    );
  }
}

export default SearchBarInterests;
