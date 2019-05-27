import React from 'react';

import SearchBarInterests from "./SearchBarInterests";
import './UserInfo.css';

class Interests extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
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
