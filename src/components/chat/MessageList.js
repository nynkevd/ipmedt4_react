import React from 'react';
import Message from './Message';

import './MessageList.css';

//Css classes kloppen nog neit helemaal

class MessageList extends React.Component {

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const position = this.props.messageList.length - 1;
    const lastMessageId = this.props.messageList[position].id;
    const element = document.getElementById(lastMessageId);
    element.scrollIntoView();
    //101384209
  }

  render(){
    return(
      <div className="messageContainer">
        <ul className="messageList" id="testlist">
          {
            this.props.messageList.map((message) =>
              <li className="messageList__item" key={message.id} id={message.id}><Message message={message}/></li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default MessageList;
