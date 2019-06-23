//React importeren
import React from 'react';
//CSS importeren
import './UserInfoFriend.css';

const UserInfoFriend = (props) => {
  console.log(props.profielfoto);
  return(
    <div className="userInfoFriendContainer">
      <img src={"https://api.ovtravelbuddy.nl" + props.profielfoto} alt="profielfoto" className="userInfoFriendContainer__profilePicture"/>
      <h2 className="userInfoFriendContainer__userName">{props.naam}</h2>
    </div>
  );
}

export default UserInfoFriend;
