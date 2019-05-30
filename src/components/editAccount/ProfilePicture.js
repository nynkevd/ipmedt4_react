import React from 'react';

import './ProfilePicture.css';

const ProfilePicture = (props) => {
  return(
    <div>
      <img src={props.picture} alt="Profielfoto" className="profilePicture" onClick={props.click} id={"profilePicture" + props.index}/>
    </div>
  );
}

export default ProfilePicture;
