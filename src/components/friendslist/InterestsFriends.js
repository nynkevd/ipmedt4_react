import React from 'react';

import './UserinfoFriends.css';

class InterestsFriends extends React.Component{
  constructor(props){
    super(props);
  }

  interestsList = this.props.interests.map((interest) =>
    <li key={interest}>{interest}</li>
  );

  render(){
    return(
      <div className="interestsFriendsContainer">
        <h2 className="interestsNameFriends">Interesses:</h2>
        <ul className="interestsListFriends">
          {this.interestsList}
        </ul>
      </div>
    );
  }
}

export default InterestsFriends;
