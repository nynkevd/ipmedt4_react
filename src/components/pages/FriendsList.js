import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import './FriendsList.css';

class FriendsList extends React.Component{
  render(){
    return(
      <div>
        <TopBar />
        <div className="friendsListPageContainer">
          <h1>Travel Buddies</h1>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default FriendsList;
