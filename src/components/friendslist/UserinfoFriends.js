//React importeren
import React from 'react';
import { Link } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeChosenFriend,
} from "./../../actions";
//Eigen componenten importeren
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
      <div className="userInfoFriendsContainer">
        <img src={this.props.profielfoto} alt="profielfoto" className="pf"/>
        <Link to="/friendsAccount"><h2 className="usernameFriends" onClick={this.changeFriend}>{this.props.naam}</h2> </Link>
      </div>
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
