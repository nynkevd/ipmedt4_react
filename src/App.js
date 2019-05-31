import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//redux
import {Provider} from "react-redux";
import {store} from "./components/pages/store";

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Search from './components/pages/Search';
import Chat from './components/pages/Chat';
import FriendsList from './components/pages/FriendsList';
import Account from './components/pages/Account';
import AccountEdit from './components/pages/AccountEdit';
import InterestsEdit from './components/pages/InterestsEdit';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
            <Provider store={store}>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/search" component={Search} />
            </Provider>
            <Route path="/chat" component={Chat} />
            <Route path="/friendsList" component={FriendsList} />
            <Route path="/account" component={Account} />
            <Route path="/editAccount" component={AccountEdit} />
            <Route path="/editInterests" component={InterestsEdit} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
