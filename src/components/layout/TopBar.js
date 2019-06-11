//React importeren
import React from 'react';
//CSS importeren
import './TopBar.css';

const TopBar = () =>{
  return(
    <div className="topBar">
      <img className="topBar__img" src="./img/NS_logo.png" alt="NS Logo"/>
      <p className="topBar__text">Travel Buddy</p>
    </div>
  );
}

export default TopBar;
