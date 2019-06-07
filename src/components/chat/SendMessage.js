//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";
//Eigen componenten importeren
import TopBarChat from './TopBarChat';
//CSS importeren
import './SendMessage.css';

class SendMessage extends React.Component {
  state = ({message: ""});

  onChange = event => {
    this.setState({message: event.target.value});
  }

  onSubmit = event => {
    event.preventDefault();
    this.sendMessage(this.state.message);
  }

  sendMessage = message => {
    // currentUser is een object van de huidige gebruiker
    const currentUser = this.props.chatKitUser;
    // Het id van de room waar de gebruiker op dit moment in zit
    const currentRoomId = this.props.clickedChatroom;

    // Als het bericht leeg is wordt het niet verzonden
    if(message.trim() === '') return;

    // sendMessage is een functie van ChatKit
    currentUser.sendMessage({
      text: message,
      roomId: currentRoomId,
    });

    this.setState({message: ""});
  }

  render(){
    return(
      <div className="sendMessageContainer">
        <form className="sendMessageForm" onSubmit={this.onSubmit}>
          <input className="sendMessageInput" type="text" placeholder="Typ hier je bericht" onChange={this.onChange} value={this.state.message}/>
          <button className="sendMessageButton" >
            <img className="sendMessageButton__image" src="./img/icons/send.svg" alt="Stuur bericht"/>
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
})(SendMessage);
