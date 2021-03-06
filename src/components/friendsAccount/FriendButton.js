// React importeren
import React from 'react';
import { Link } from 'react-router-dom';

// Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeAddOrDeleteFriend,
} from "./../../actions";

// CSS importeren
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
    if (this.props.addOrDeleteFriend === "add") {
      this.befriend();
      // this.render();
      this.setState({ state: this.state });
    } else if (this.props.addOrDeleteFriend === "delete") {
      this.unfriend();
      // this.render();
      this.setState({ state: this.state });
    }
  }

  befriend = _ => {
    fetch(`https://dataserver.ovtravelbuddy.nl/friends/add?username=${this.props.userName}&friend=${this.state.friend}`)
  }

  unfriend = _ => {
    fetch(`https://dataserver.ovtravelbuddy.nl/friends/delete?username=${this.props.userName}&friend=${this.state.friend}`)
  }

  render(){
    return(
      <Link className="linkFriendButton" to="/friendsList">
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
