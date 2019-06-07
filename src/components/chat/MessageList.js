//React en benodigheden importeren
import React from 'react';
//Eigen componenten importeren
import Message from './Message';
//CSS importeren
import './MessageList.css';

//Css classes kloppen nog neit helemaal

class MessageList extends React.Component {

  componentDidUpdate(){
    // Zodra de pagina wordt geopend, en als er een nieuw bericht is, scrollt de pagina automatisch naar beneden
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const position = this.props.messageList.length - 1;
    const lastMessageId = this.props.messageList[position].id;
    const lastMessageElement = document.getElementById(lastMessageId);
    
    lastMessageElement.scrollIntoView();
  }

  render(){
    return(
      <div className="messageContainer">
        <ul className="messageList">
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
