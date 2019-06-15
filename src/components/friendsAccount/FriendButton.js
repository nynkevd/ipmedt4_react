import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import {
  changeUserName,
  changeAddOrDeleteFriend,
} from "./../../actions";

import './FriendButton.css';

class FriendButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      friend: props.friend,
      buttonClass: props.buttonClass,
      buttonText: props.buttonText,
    }
  }

//Het daadwerkelijk aanroepen van de functies
  addOrDeleteFriend = _ => {
    if (this.props.addOrDeleteFriend == "add") {
      this.befriend();
      // this.render();
      console.log("re-render");
      this.setState({ state: this.state });
    } else if (this.props.addOrDeleteFriend == "delete") {
      this.unfriend();
      // this.render();
      console.log("re-render");
      this.setState({ state: this.state });
    }
  }

  befriend = _ => {
    console.log("ik wil vriendjes zijn met " + this.state.friend);
    fetch(`https://dataserver.ovtravelbuddy.nl/friends/add?username=${this.props.userName}&friend=${this.state.friend}`)
  }

  unfriend = _ => {
    console.log("ik wil geen vriendjes meer zijn met " + this.state.friend);
    fetch(`https://dataserver.ovtravelbuddy.nl/friends/delete?username=${this.props.userName}&friend=${this.state.friend}`)
  }

  render(){
    return(
      <Link to="/friendsList">
        <button id="button__AOD" className={this.props.buttonClass} onClick={this.addOrDeleteFriend}> {this.props.buttonText} </button>
      </Link>
    )
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    addOrDeleteFriend: state.addOrDeleteFriend,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeAddOrDeleteFriend: changeAddOrDeleteFriend,
})(FriendButton);
