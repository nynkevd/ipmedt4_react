import React from 'react';

import './ProfilePicture.css';

const ProfilePicture = (props) => {
  return(
    <div>
      <img src={"https://api.ovtravelbuddy.nl" + props.picture} alt="Profielfoto" className="profilePicture" onClick={props.onClick} id={"profilePicture" + props.index}/>
    </div>
  );
}

export default ProfilePicture;
