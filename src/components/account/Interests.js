//React importeren
import React from 'react';
//CSS importeren
import './UserInfoAccount.css';

const Interests = (props) => {
  return(
    <div className="interestsAccountContainer">
      <h3>Interesses</h3>
      <div>
        {
          props.interests.map((interest, index) =>
            <p key={index}>{interest}</p>
          )
        }
      </div>
    </div>
  )
}

export default Interests;
