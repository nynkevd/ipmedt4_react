import React from 'react';
import ReactDOM from 'react-dom';
import logo from './ns.png';

import './TopBar.css';

class TopBar extends React.Component{
  render(){
    return(
      <div className="topBar">
        <div><img className="topBarFoto" src={logo} alt="NS Logo"/></div>
        <div className="topBarTekst">Travel Buddy</div>
      </div>
    )
  }
}


export default TopBar;
