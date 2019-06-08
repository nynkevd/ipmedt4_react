//React en benodigheden importeren
import React from 'react';
import axios from "axios";
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

    this.setReadCursor(lastMessageId); // Niet heel goed om dit hier aan te roepen aangezien hij voor elk bericht wordt uitgevoerd zodra dit component laadt.
  }

  // Markeert de berichten als gelezen
  setReadCursor = (position) => {
    this.props.currentUser.setReadCursor({
      roomId: this.props.roomId, // Moet redux worden
      position: position // Moet redux worden
    }).then(() => {
      console.log("Bericht gelezen!")
    }).catch(err => {
      console.log(`Oops ${err}`)
    })
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
