import React from 'react';
import { connect } from "react-redux";
import {
  changeChatKitUser,
} from "./../../actions";
import { Link } from 'react-router-dom';

const ChatRoomCard = (props) => {

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

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
})(ChatRoomCard);
