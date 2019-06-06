import React from 'react';
import { Redirect } from 'react-router-dom';
import Chatkit from '@pusher/chatkit-client';

import TopBar from '../layout/TopBar';
import SendMessage from './SendMessage';
import MessageList from './MessageList';

const ChatRoom = () => {
  const messages = [
      {
        message: "hallo ik ben Anouk",
        sender: "Anouk2",
        time: new Date(2019, 6, 1, 14, 57, 30, 3),
      },
      {
        message: "Dit is het tweede bericht",
        sender: "Anouk2",
        time: new Date(2019, 6, 1, 14, 59, 30, 3),
      }
    ];

    // <MessageList messages={messages} />
  return(
    <div className="App">
        <div id="matches-scherm"></div>
        <div id="chat-scherm">
          <MessageList />
          <SendMessage />
        </div>

      </div>
  )
}

export default ChatRoom;
