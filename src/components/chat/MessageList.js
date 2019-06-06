import React from 'react';
import Message from './Message';


const MessageList = (props) => {
  return(
    <ul>
      {
        props.messageList.map((message) =>
          <Message message={message} key={message.id}/>
        )
      }
    </ul>
  )
}

export default MessageList;
