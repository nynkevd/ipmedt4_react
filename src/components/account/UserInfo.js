import React from 'react';
import {Link} from 'react-router-dom';

import './UserInfo.css';


const UserInfo = (props) => {
  return(
    <div className="userInfoContainer">
      <img src={props.profielfoto} alt="profielfoto" className="pf"/>
      <h2 className="username">{props.naam}</h2>
      <Link to="/editAccount"><img className="editIcon" src="./img/icons/pencil-edit-button.svg" alt=""/></Link>
    </div>
  );
}

export default UserInfo;
