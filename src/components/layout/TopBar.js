//React en benodigheden importeren
import React from 'react';
import { Link } from 'react-router-dom';
//SCSS importeren
import './TopBar.scss';

const TopBar = () =>{
  return(
    <div className="topBar">
      <img className="topBar__img" src="./img/logoSmall.svg" alt="Travel Buddy Logo"/>
      <p className="topBar__text">Travel Buddy</p>
      <Link to="/" id="link">
        <img className="topBar__img topBar__img--logout" src="./img/icons/logout.svg" alt="Uitloggen" />
      </Link>
    </div>
  );
}

export default TopBar;
