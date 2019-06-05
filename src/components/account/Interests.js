//React importeren
import React from 'react';
//Eigen componenten importeren
import SearchBarInterests from "./SearchBarInterests";
//CSS importeren
import './UserInfo.css';

class Interests extends React.Component{

  render(){
    return(
      <div className="interestsContainer">
        <h3>Interesses</h3>
        <SearchBarInterests className="searchbarInterests" onSearch={this.onSubmit}></SearchBarInterests>
        <ul className="interestsList">
          {
            this.props.interests.map((interest, index) =>
              <li key={index}>{interest}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Interests;
