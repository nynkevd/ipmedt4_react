import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import Reistraject from '../account/Reistraject';

import './Account.css';

class Account extends React.Component{
  render(){
    return(
      <div>
        <TopBar />
        <div className="accountPageContainer">
          <h1>Account</h1>
          <UserInfo profielfoto="https://via.placeholder.com/150" naam="Anouk"></UserInfo>
          <Reistraject van="Voorschoten" naar="Leiden Centraal"></Reistraject>
          <Interests interests={["programmeren", "techniek"]}></Interests>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Account;
