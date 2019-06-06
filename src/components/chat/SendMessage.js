import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
} from "./../../actions";

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
    console.log(message);
    console.log(this.props.chatKitUser);
    const currentUser = this.props.chatKitUser;
    const currentRoomId = Object.keys(currentUser.roomSubscriptions)[0]; //Ik weet niet of dit altijd werkt + misschien moet het iets duidelijker
    if(message.trim() === '') return;

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
          <input className="sendMessageInput" type="text" placeholder="message..." onChange={this.onChange} value={this.state.message}/>
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
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(SendMessage);
