import React from 'react';

import BottomNavItem from './BottomNavItem';

import './BottomNav.css';

class BottomNav extends React.Component{
  render(){
    return(
      <div>
        <div className="bottomNav">
          <div className="bottomNavGrid">
            <BottomNavItem className="bottomNavItem" name="Zoek" link="/search" icon="./icons/search_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Chat" link="/chat" icon="./icons/chat_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Travel Buddies" link="/friendsList" icon="./icons/people_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Account" link="/account" icon="./icons/account_icon.svg"/>
          </div>
        </div>
      </div>
    )
  }
}

export default BottomNav;
