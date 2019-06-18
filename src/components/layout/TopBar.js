//React importeren
import React from 'react';
import { Link } from 'react-router-dom';
//CSS importeren
import './TopBar.css';

const TopBar = () =>{
  return(
    <div className="topBar">
      <Link to="/search">
        <img className="topBar__img" src="./img/logoSmall.svg" alt="Travel Buddy Logo"/>
      </Link>
      <p className="topBar__text">Travel Buddy</p>
      <Link to="/" id="link">
        <img className="topBar__img topBar__img--logout" src="./img/icons/logout.svg" alt="Uitloggen" />
      </Link>
    </div>
  );
}

export default TopBar;
