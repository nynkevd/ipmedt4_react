//React en benodigheden importeren
import React from 'react';
//Eigen componenten importeren
import BottomNavItem from './BottomNavItem';
//CSS importeren
import './BottomNav.css';

class BottomNav extends React.Component{
  render(){
    return(
      <div>
        <div className="bottomNav">
          <div className="bottomNavGrid">
            <BottomNavItem className="bottomNavItem" name="Zoek" link="/search" icon="./img/icons/search_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Chat" link="/chat" icon="./img/icons/chat_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Travel Buddies" link="/friendsList" icon="./img/icons/people_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Account" link="/account" icon="./img/icons/account_icon.svg"/>
          </div>
        </div>
      </div>
    )
  }
}

export default BottomNav;
