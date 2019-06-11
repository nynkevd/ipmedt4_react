//React importeren
import React from 'react';
//Eigen componenten importeren
import './UserinfoFriends.css';
import Unfriend from './Unfriend';

const UserinfoFriends = (props) => {
  return(
    <div className="userInfoFriendsContainer">
      <img src={props.profielfoto} alt="profielfoto" className="pf"/>
      <h2 className="usernameFriends">{props.naam}</h2>
      <Unfriend friend={props.naam}> </Unfriend>
    </div>
  );
}

export default UserinfoFriends;
