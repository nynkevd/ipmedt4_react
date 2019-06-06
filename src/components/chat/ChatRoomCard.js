// React en benodigdheden importeren
import React from 'react';
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";

// css importeren
import './ChatRoomCard.css';

class ChatRoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:props.id};
  }

  onClick = event => {
    this.props.changeChatroomClicked(this.props.clickedChatroom);
    console.log(this.props.chatKitUser.rooms[this.props.id].id);
  }
// .customData.userIds

  render(){
    console.log(this.props.chatKitUser.rooms[this.props.id].id);
    console.log(this.props.chatKitUser.rooms[this.props.id].userIds);
    return(
      <Link to='/chatRoom'>
        <div className="chatCardContainer" onClick={this.onClick}>
          <div>
            <h3 className="chatCardContainer__text">Username</h3>
            <p className="chatCardContainer__text">Last message</p>
          </div>
        </div>
      </Link>
      );
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
})(ChatRoomCard);
