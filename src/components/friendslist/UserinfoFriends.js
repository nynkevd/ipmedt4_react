//React importeren
import React from 'react';
import { Link } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeChosenFriend,
} from "./../../actions";
//CSS importeren
import './UserinfoFriends.css';

class UserinfoFriends extends React.Component {
  constructor(props){
    super(props);
  }

  changeFriend = _ => {
    this.props.changeChosenFriend(this.props.naam);
  }

  render(){
    console.log(this.props.chosenFriend);
    return(
      <Link to="/friendsAccount">
        <div className="userInfoFriendsContainer">
          <img src={"https://api.ovtravelbuddy.nl" + this.props.profielfoto} alt="profielfoto" className="userInfoFriendsContainer__profilePicture"/>
          <h2 className="userInfoFriendsContainer__usernameFriends" onClick={this.changeFriend}>{this.props.naam}</h2>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = state =>{
  return {
    chosenFriend: state.chosenFriend,
  };
}

export default connect(mapStateToProps,{
  changeChosenFriend: changeChosenFriend,
})(UserinfoFriends);
