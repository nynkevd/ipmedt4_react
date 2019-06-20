// React importeren
import React from 'react';
import { Link } from 'react-router-dom';
// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
} from './../../actions';

// CSS Importeren
import './TopBarEditAccount.css';

const TopBarEditAccount = () => {
  return(
    <div className="topBarEditAccount">
      <Link to='/account' className="account">
        <img className="topBarEditAccount__back" src="./img/icons/arrow_back.svg" alt="Terug" />
      </Link>
      <p className="topBarEditAccount__text">Edit Account</p>
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
})(TopBarEditAccount);
