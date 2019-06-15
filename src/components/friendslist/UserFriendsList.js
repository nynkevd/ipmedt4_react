//React en benodigheden importeren
import React from 'react';
import axios from "axios";
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
} from "./../../actions";
//Eigen componenten importeren
import Friend from './Friend';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class UserFriendsList extends React.Component {
  state = {
    friends: [],
  }

  componentDidMount(){
    this.getFriendsFromApi(base_url, api_token);
    console.log(this.state.friends.length);
  }

  getFriendsFromApi = (base_url, api_token) => {
    axios.get(base_url + "friends/" + this.props.userName + api_token).then(res => {
      this.setState({friends: res.data});
    });
  }

  render(){
    console.log(this.state.friends.length);
    return (
      <div>
      {
        this.state.friends.map((username, index) =>
          <Friend username={username} key={index} index={index}/>
        )
      }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(UserFriendsList);
