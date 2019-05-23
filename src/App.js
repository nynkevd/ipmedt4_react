import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import BottomNav from './components/layout/BottomNav';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="app">
          <BottomNav />
        </div>
      </Router>
    );
  }
}

export default App;
