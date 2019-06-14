//React en benodigheden importeren
import React from "react";
import { Link } from "react-router-dom";
//Redux importeren
import { connect } from "react-redux";
import {
  changeChosenFriend,
} from "./../../actions";
//CSS importeren
import './MatchCard.css';

class MatchCard extends React.Component {
  constructor(props){
    super(props);
  }

  changeFriend = _ => {
    this.props.changeChosenFriend(this.props.user);
  }

  componentDidMount(){
    this.listInterests();
  }

  listInterests = _ => {

  }
  render(){
    return(
      <div className="matchCard">
        <Link to="/friendsAccount"><h3 onClick={this.changeFriend}>{this.props.user}</h3> </Link>
        <ul>
          {
            this.props.interests.map((interest) =>
              <li key={interest}>{interest}</li>
            )
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state =>{
  return {
    chosenFriend: state.chosenFriend,
  };
}

export default connect(mapStateToProps,{
  changeChosenFriend: changeChosenFriend,
})(MatchCard);
