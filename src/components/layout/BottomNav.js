import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Search from '../pages/Search';
import Chat from '../pages/Chat';
import FriendsList from '../pages/FriendsList';
import Account from '../pages/Account';

import BottomNavItem from './BottomNavItem';

import './BottomNav.css';

class BottomNav extends React.Component{
  render(){
    return(
      <Router>
        <div>
          <Route path="/search" component={Search} />
          <Route path="/chat" component={Chat} />
          <Route path="/friendsList" component={FriendsList} />
          <Route path="/account" component={Account} />
        </div>
        <div className="bottomNav">
          <div className="bottomNavGrid">
            <BottomNavItem className="bottomNavItem" name="Zoek" link="/search" icon="./icons/search_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Chat" link="/chat" icon="./icons/chat_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Travel Buddies" link="/friendsList" icon="./icons/people_icon.svg"/>
            <BottomNavItem className="bottomNavItem" name="Account" link="/account" icon="./icons/account_icon.svg"/>
          </div>
        </div>
      </Router>
    )
  }
}

export default BottomNav;
