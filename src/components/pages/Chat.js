import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import './Chat.css';

class Chat extends React.Component{
  render(){
    return(
      <div>
        <TopBar />
        <div className="chatPageContainer">
          <h1>Chat</h1>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Chat;
