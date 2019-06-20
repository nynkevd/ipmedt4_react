//React en benodigheden importeren
import React from 'react';
//Redux importeren
import { connect } from "react-redux";
import {
  changeMessageList,
  changeCurrentChatroom,
  changeChatKitUser,
} from "./../../actions";
//Eigen componenten importeren
import Message from './Message';
//CSS importeren
import './MessageList.css';

//Css classes kloppen nog neit helemaal

class MessageList extends React.Component {

  componentDidMount(){
    // Als het component wordt geladen scrollt de pagina automatisch naar beneden
    this.scrollToBottom();
  }

  componentDidUpdate(){
    // Zodra er een nieuw bericht is scrollt de pagina automatisch naar beneden
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    var messages = this.props.messageList.filter(message =>
      message.roomId == this.props.currentChatroom.id);

    // Scrollt alleen als er berichten zijn
    if(messages.length > 0){
      const position = messages.length - 1;
      const lastMessageId = messages[position].id;
      const lastMessageElement = document.getElementById(lastMessageId);

      // Scoll naar het laatste bericht
      lastMessageElement.scrollIntoView();

      // Markeert de berichten als gelezen
      this.setReadCursor(lastMessageId);
    };
  }

  // Markeert de berichten als gelezen
  setReadCursor = (position) => {
    this.props.chatKitUser.setReadCursor({
      roomId: this.props.currentChatroom.id,
      position: position
    }).then(() => {
      console.log("Bericht gelezen!")
    }).catch(err => {
      console.log(`Oops ${err}`)
    })
  }

  render(){
    return(
      <ul className="messageList">
        {
          // De berichten worden gefilterd zodat je alleen de berichten in de huidige room kan zien, aangezien het opslaan in een object in redux niet realtime wil werken
          this.props.messageList.filter(message =>
            message.roomId == this.props.currentChatroom.id)
          .map((message) =>
            <li className="messageList__item" key={message.id} id={message.id}><Message message={message}/></li>
          )
        }
      </ul>
    )
  }
}

const mapStateToProps = state =>{
  return {
    messageList: state.messageList,
    currentChatroom: state.currentChatroom,
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeMessageList: changeMessageList,
  changeCurrentChatroom: changeCurrentChatroom,
})(MessageList);
