import React from 'react';
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeChatroomClicked,
} from "./../../actions";
import { Link } from 'react-router-dom';

class ChatRoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id:props.id};
  }

  onClick = event => {
    
  }

  render(){
    console.log(this.props.chatKitUser.rooms[this.props.id].id);
    return(
      <div>
      <Link to='/chatRoom'>
        <div>
          <h3>Username</h3>
          <div>Last message (?)</div>
        </div>
      </Link>
      </div>
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
