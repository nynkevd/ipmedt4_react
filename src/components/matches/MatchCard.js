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
    this.state = ({
      interestList: "",
      meerTekst: "",
    });
  }

  componentDidMount(){
    this.mapInterests();
  }

  mapInterests = () => {
    var allInterests = this.props.interests;
    var meerTekst = "";

    if(allInterests.length > 3){
      var maxInterests = allInterests.splice(0, 3);
      meerTekst = "+ " + allInterests.length + " meer";
    }else{
      maxInterests = allInterests;
    }

    var mappedList = maxInterests.map((interest) =>
      <li key={interest}>{interest}</li>
    )

    this.setState({
      interestList: mappedList,
      meerTekst: meerTekst,
    });

  }

  changeFriend = _ => {
    this.props.changeChosenFriend(this.props.user);
  }

  // componentDidMount(){
  //   this.listInterests();
  // }

  listInterests = _ => {

  }
  render(){
    return(
      <Link to="/friendsAccount" className="matchCard__link"  onClick={this.changeFriend}>
        <div className="matchCard">
          <h3 className="matchCard__text">{this.props.user}</h3>
          <ul>
            {this.state.interestList}
          </ul>
          {this.state.meerTekst}
        </div>
      </Link>
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
