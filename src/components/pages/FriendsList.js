//React en benodigheden importeren
import React from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import { changeLoggedIn } from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import UserFriendsList from '../friendslist/UserFriendsList';

//CSS importeren
import './FriendsList.css';

const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class FriendsList extends React.Component{
  render(){
    console.log(this.props.allUserFriends);
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="friendsListPageContainer">
        {this.props.allUserFriends.length > 0 ?
          <UserFriendsList />
          :
          <div id="nofriends">
            <p> Je hebt geen vrienden </p>
            <Link to="/search"> <img id="sadLogoFriends" src="./img/logoSad.svg" alt="Travel Buddy Sad Logo"/> </Link>
          </div>
        }
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
    allUserFriends: state.allUserFriends,
  };
}

export default connect(mapStateToProps,{
  changeLoggedIn: changeLoggedIn,
})(FriendsList);
