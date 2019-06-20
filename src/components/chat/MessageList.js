//React en benodigheden importeren
import React from 'react';
import axios from "axios";
//Redux importeren
import { connect } from "react-redux";
import {
  changeMessageList,
  changeCurrentChatroom,
} from "./../../actions";
//Eigen componenten importeren
import Message from './Message';
//CSS importeren
import './MessageList.css';

//Css classes kloppen nog neit helemaal

class MessageList extends React.Component {

  componentDidMount(){
    if(this.props.messageLis !== undefined){
      this.scrollToBottom();
    }

    //console.log(this.props.messageList[this.props.currentChatroom.id]);
  }

  componentDidUpdate(){
    // Zodra de pagina wordt geopend, en als er een nieuw bericht is, scrollt de pagina automatisch naar beneden
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    //var messages = this.props.messageList[this.props.currentChatroom.id];
    //[this.props.currentChatroom.id]

    console.log(this.props.messageList);

    var messages = this.props.messageList.filter(message =>
      message.roomId == this.props.currentChatroom.id);

    console.log(messages)

    if(messages.length > 0){
      const position = messages.length - 1;
        console.log(position)
      const lastMessageId = messages[position].id;
      const lastMessageElement = document.getElementById(lastMessageId);

    ;
      lastMessageElement.scrollIntoView();

      this.setReadCursor(lastMessageId); // Niet heel goed om dit hier aan te roepen aangezien hij voor elk bericht wordt uitgevoerd zodra dit component laadt.
    };


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
            /*this.props.messageList[this.props.currentChatroom.id]*/
            this.props.messageList.filter(message =>
              message.roomId == this.props.currentChatroom.id)
            .map((message) =>
              <li className="messageList__item" key={message.id} id={message.id}><Message message={message}/></li>
            )
          }
          <li id="test" ></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    messageList: state.messageList,
    currentChatroom: state.currentChatroom,
  };
}

export default connect(mapStateToProps,{
  changeMessageList: changeMessageList,
  changeCurrentChatroom: changeCurrentChatroom,
})(MessageList);

//export default MessageList;
