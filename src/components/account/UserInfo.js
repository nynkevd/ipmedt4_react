import React from 'react';
import {Link} from 'react-router-dom';

import './UserInfoAccount.css';


const UserInfo = (props) => {
  return(
    <div className="userInfoContainer">
      <img src={"https://api.ovtravelbuddy.nl" + props.profielfoto} alt="profielfoto" className="profilePicture"/>
      <h2 className="userName">{props.naam}</h2>
      <Link to="/editAccount"><img className="editIcon" src="./img/icons/pencil-edit-button.svg" alt=""/></Link>
    </div>
  );
}

export default UserInfo;
