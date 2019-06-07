// React en benodigdheden importeren
import React from 'react';
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";

// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';

// css importeren
import './ChatRoomCard.css';

class ChatRoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:props.id};
  }

  onClick = event => {
    this.props.changeChatroomClicked(this.props.room);
  }

  render(){
    return(
      <Link to='/chatRoom' className="chatCardLink">
        <div className="chatCardContainer" onClick={this.onClick}>
          <div>
            <h3 className="chatCardContainer__text">{getRoomName(this.props.room, this.props.chatKitUser)}</h3>
            <p className="chatCardContainer__text">{"Laatste bericht om: " +  this.props.room.lastMessageAt}</p>
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
