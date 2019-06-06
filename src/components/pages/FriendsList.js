//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import { changeLoggedIn } from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import UserFriendsList from '../friendslist/UserFriendsList';

//CSS importeren
import './FriendsList.css';

class FriendsList extends React.Component{
  render(){
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="friendsListPageContainer">
          <UserFriendsList />
        </div>
        <BottomNav />
      </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
})(FriendsList);
