import React from 'react';

import './UserinfoFriends.css';

const UserinfoFriends = (props) => {
  return(
    <div className="userInfoFriendsContainer">
      <img src={props.profielfoto} alt="profielfoto" className="pf"/>
      <h2 className="usernameFriends">{props.naam}</h2>
    </div>
  );
}

export default UserinfoFriends;
