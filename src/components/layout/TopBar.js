import React from 'react';

import './TopBar.css';

class TopBar extends React.Component{
  render(){
    return(
      <div className="topBar">
        <div><img className="topBarImg" src="./img/NS_logo.png" alt="NS Logo"/></div>
        <div className="topBarText">Travel Buddy</div>
      </div>
    )
  }
}


export default TopBar;
