//React importeren
import React from 'react';
//CSS importeren
import './TopBarChat.css';

const TopBarChat = () =>{
  return(
    <div className="topBarChat">
      <img className="topBarChat__img" src="./img/NS_logo.png" alt="NS Logo"/>
      <p className="topBarChat__text">Travel Buddy</p>
    </div>
  );
}

export default TopBarChat;
