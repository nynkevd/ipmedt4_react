import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import './Account.css';

class Account extends React.Component{
  render(){
    return(
      <div>
        <TopBar />
        <div className="accountPageContainer">
          <h1>Account</h1>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Account;
