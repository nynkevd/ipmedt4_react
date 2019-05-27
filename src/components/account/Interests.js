import React from 'react';

import SearchBarInterests from "./SearchBarInterests";
import './UserInfo.css';

class Interests extends React.Component{
  constructor(props){
    super(props);
  }

  interestsList = this.props.interests.map((interest) =>
    <li key={interest}>{interest}</li>
  );

  render(){
    return(
      <div className="interestsContainer">
        <h3 className="interestName">Interesses</h3>
        <SearchBarInterests className="searchbarInterests" onSearch={this.onSubmit}></SearchBarInterests>
        <ul className="interestsList">
          {this.interestsList}
        </ul>
      </div>
    );
  }
}

export default Interests;
