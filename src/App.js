import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

//Importeren van alles pagina's
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Registreren from './components/pages/Registreren';
import Zoek from './components/pages/Zoek';
import Chat from './components/pages/Chat';
import VriendenLijst from './components/pages/VriendenLijst';
import Account from './components/pages/Account';

import BottomNav from './components/BottomNav';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="app">
          <Link to="/home">Home</Link> | <Link to="/login">Login</Link> | <Link to="/registreren">Registreren</Link> | <Link to="/zoek">Zoek</Link>
          | <Link to="/chat">Chat</Link> | <Link to="/vriendenLijst">VriendenLijst</Link> | <Link to="/account">Account</Link>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registreren" component={Registreren} />
          <Route path="/zoek" component={Zoek} />
          <Route path="/chat" component={Chat} />
          <Route path="/vriendenLijst" component={VriendenLijst} />
          <Route path="/account" component={Account} />
          <BottomNav />
        </div>
      </Router>
    );
  }
}

export default App;
