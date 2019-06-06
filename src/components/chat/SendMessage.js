import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
} from "./../../actions";

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
    return this.props.loggedIn
      ?<div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="message..." onChange={this.onChange} value={this.state.message}/>
        </form>
      </div>
    //Naar de login pagina sturen als er niet ingelogd is
    : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName, //Ik weet even niet of deze gebruikt wordt
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
})(SendMessage);
