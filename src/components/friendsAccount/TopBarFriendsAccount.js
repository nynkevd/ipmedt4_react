// React importeren
import React from 'react';
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
} from './../../actions';

// CSS Importeren
import './TopBarFriendsAccount.css';

const TopBarFriendsAccount = () => {
  return(
    <div className="topBarFriendsAccount">
      <Link to='/friendslist' className="friendsList">
        <img className="topBarFriendsAccount__back" src="./img/icons/arrow_back.svg" alt="Terug" />
      </Link>
      <p className="topBarFriendsAccount__text"></p>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps, {
  changeChatKitUser: changeChatKitUser,
})(TopBarFriendsAccount);
