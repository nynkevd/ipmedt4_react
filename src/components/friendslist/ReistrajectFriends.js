//React importeren
import React from "react";
//Eigen componenten importeren
import './UserinfoFriends.css';

const ReistrajectFriends = (props) => {
  return(
    <div className="travelRouteFriendsContainer">
    <h2 className="travelRouteName">Reistraject:</h2>
      <ul className="whereFromFriends">
        <li>van: {props.van}</li>
        <li>naar: {props.naar}</li>
      </ul>
    </div>
  );
}

export default ReistrajectFriends;
