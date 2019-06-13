import React from 'react';

import { connect } from "react-redux";
import {
  changeUserName,
} from "./../../actions";

// import './UserinfoFriends.css';

class FriendButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      friend: props.friend,
    }
  }

  unfriend = _ => {
    console.log("ik wil geen vriendjes meer zijn met " + this.state.friend);
    fetch(`http://136.144.230.97:4000/friends/delete?username=${this.props.userName}&friend=${this.state.friend}`)
  }

  render(){
    return(
      <button className="button__unfriend" onClick={this.unfriend}> Vriend verwijderen </button>
    );
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(FriendButton);
