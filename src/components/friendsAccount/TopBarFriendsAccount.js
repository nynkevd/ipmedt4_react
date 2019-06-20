// React importeren
import React from 'react';
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
  changePageToReturnTo,
} from './../../actions';

// CSS Importeren
import './TopBarFriendsAccount.css';

const TopBarFriendsAccount = (props) => {
  return(
    <div className="topBarFriendsAccount">
      <Link to={props.pageToReturnTo} className="friendsList">
        <img className="topBarFriendsAccount__back" src="./img/icons/arrow_back.svg" alt="Terug" />
      </Link>
      <p className="topBarFriendsAccount__text"></p>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    chatKitUser: state.chatKitUser,
    pageToReturnTo: state.pageToReturnTo,
  };
}

export default connect(mapStateToProps, {
  changeChatKitUser: changeChatKitUser,
  changePageToReturnTo: changePageToReturnTo,
})(TopBarFriendsAccount);
