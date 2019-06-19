//React importeren
import React from 'react';
//CSS importeren
import './UserInfoAccount.css';

const Interests = (props) => {
  return(
    <div className="interestsAccountContainer">
      <h3>Interesses</h3>
      <ul className="interestsListAccount">
        {
          props.interests.map((interest, index) =>
            <li key={index}>{interest}</li>
          )
        }
      </ul>
    </div>
  )
}

export default Interests;
