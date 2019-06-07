//React en benodigheden importeren
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//Redux importeren
import { Provider } from "react-redux";
import { store } from "./store";
//Eigen componenten importeren
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import SetUpAccount from './components/pages/SetUpAccount';
import Search from './components/pages/Search';
import Chat from './components/pages/Chat';
import ChatRoom from './components/pages/ChatRoom'
import FriendsList from './components/pages/FriendsList';
import Account from './components/pages/Account';
import AccountEdit from './components/pages/AccountEdit';
import InterestsEdit from './components/pages/InterestsEdit';
import NotFoundPage from './components/pages/NotFoundPage';
//CSS importeren
import './App.css';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="app">
        <Provider store={store}>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/setUpAccount" component={SetUpAccount} />
              <Route path="/search" component={Search} />
              <Route path="/chat" component={Chat} />
              <Route path="/chatRoom" component={ChatRoom} />
              <Route path="/friendsList" component={FriendsList} />
              <Route path="/account" component={Account} />
              <Route path="/editAccount" component={AccountEdit} />
              <Route path="/editInterests" component={InterestsEdit} />
              <Route component={NotFoundPage} />
          </Switch>
          </Provider>
        </div>
      </Router>
    );
  }
}

export default App;
