//React importeren
import React from 'react';

//CSS importeren
import './TopBarChat.css';

const TopBarChat = () =>{
  return(
    <div className="topBar">
      <div><img className="topBar__Img" src="./img/NS_logo.png" alt="NS Logo"/></div>
      <div className="topBar__Text">Travel Buddy</div>
    </div>
  );
}

export default TopBarChat;
