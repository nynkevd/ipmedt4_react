import React from 'react';
import './UserInfo.css';

const UserInfo = (props) => {
  return(
    <div className="userInfoContainer">
      <img src={props.profielfoto} alt="profielfoto" className="pf"/>
      <h2 className="username">{props.naam}</h2>
      <img className="editIcon" src="./icons/pencil-edit-button.svg" alt=""/>
    </div>
  );
}

export default UserInfo;
