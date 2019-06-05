//React importeren
import React from 'react';
//CSS importeren
import './TopBar.css';

const TopBar = () =>{
  return(
    <div className="topBar">
      <div><img className="topBarImg" src="./img/NS_logo.png" alt="NS Logo"/></div>
      <div className="topBarText">Travel Buddy</div>
    </div>
  );
}

export default TopBar;
