//React importeren
import React from 'react';
//Eigen componenten importeren
import SearchBarInterests from "./SearchBarInterests";
//CSS importeren
import './UserInfoAccount.css';

class Interests extends React.Component{

  render(){
    return(
      <div className="interestsAccountContainer">
        <h3>Interesses</h3>
        <ul className="interestsListAccount">
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
