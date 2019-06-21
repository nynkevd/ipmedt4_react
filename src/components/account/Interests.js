//React importeren
import React from 'react';
//CSS importeren
import './Interests.css';

const Interests = (props) => {
  return(
    <div className="interestsAccountContainer">
      <h3>Interesses</h3>
      <div>
        {
          props.interests.map((interest, index) =>
            <p key={index} className="interestsAccountContainer__interest">{interest}</p>
          )
        }
      </div>
    </div>
  )
}

export default Interests;
