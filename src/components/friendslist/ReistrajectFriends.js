//React importeren
import React from "react";
//Eigen componenten importeren


const ReistrajectFriends = (props) => {
  return(
    <div className="travelRouteFriendsContainer">
    <h2 className="travelRouteFriendsContainer__name">Reistraject:</h2>
      <ul className="travelRouteFriendsContainer__name__route">
        <li>van: {props.van}</li>
        <li>naar: {props.naar}</li>
      </ul>
    </div>
  );
}

export default ReistrajectFriends;
