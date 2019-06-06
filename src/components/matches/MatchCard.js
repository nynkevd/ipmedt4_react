//React en benodigheden importeren
import React from "react";
//CSS importeren
import './MatchCard.css';

const MatchCard = props => {
  const interests = props.interests.map((interest) =>
    <li key={interest}>{interest}</li>
  );
  return(
    <div className="matchCard">
      <h3>{props.user}</h3>
      <ul>{interests}</ul>
    </div>
  );
};

export default MatchCard;
