//React en benodigheden importeren
import React from 'react';
import {Link} from 'react-router-dom';
//CSS importeren
import './UserInfo.css';

const UserInfo = (props) => {
  return(
    <div className="userInfoContainer">
      <img src={"https://api.ovtravelbuddy.nl" + props.profielfoto} alt="profielfoto" className="userInfoContainer__profilePicture"/>
      <h2 className="userInfoContainer__userName">{props.naam}</h2>
      <Link to="/editAccount">
        <img className="userInfoContainer__editIcon" src="./img/icons/pencil-edit-button.svg" alt=""/>
      </Link>
    </div>
  );
}

export default UserInfo;
