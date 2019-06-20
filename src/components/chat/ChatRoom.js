//React en benodigheden importeren
import React from 'react';
//Eigen componenten importeren
import TopBarChat from '../chat/TopBarChat';
import SendMessage from '../chat/SendMessage';
import MessageList from '../chat/MessageList';
//CSS importeren
import './ChatRoom.css';

const ChatRoom = (props) => {
  return(
    <div className="App">
      <div id="chatroom-activity">
        <TopBarChat />
        <MessageList />
        <SendMessage />
      </div>
    </div>
  )
}

export default ChatRoom;
