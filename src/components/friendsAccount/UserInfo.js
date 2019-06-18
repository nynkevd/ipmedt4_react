import React from 'react';
import {Link} from 'react-router-dom';

import './UserInfo.css';


const UserInfo = (props) => {
  return(
    <div className="userInfoContainer">
      <img src={"https://api.ovtravelbuddy.nl" + props.profielfoto} alt="profielfoto" className="profilePicture"/>
      <h2 className="userNameFriend">{props.naam}</h2>
    </div>
  );
}

export default UserInfo;
