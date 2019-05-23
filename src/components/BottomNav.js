import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Zoek from './pages/Zoek';
import Chat from './pages/Chat';
import VriendenLijst from './pages/VriendenLijst';
import Account from './pages/Account';

import './BottomNav.css';

class BottomNav extends React.Component{
  render(){
    return(
      <Router>
        <div className="bottomNav">
          <Link to="/zoek">Zoek</Link> | <Link to="/chat">Chat</Link> | <Link to="/vriendenLijst">VriendenLijst</Link> | <Link to="/account">Account</Link>
          <Route path="/zoek" component={Zoek} />
          <Route path="/chat" component={Chat} />
          <Route path="/vriendenLijst" component={VriendenLijst} />
          <Route path="/account" component={Account} />
        </div>
      </Router>
    )
  }
}

export default BottomNav;
