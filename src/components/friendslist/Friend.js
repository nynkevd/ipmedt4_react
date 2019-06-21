//REact en benodigheden importeren
import React from 'react';
import axios from 'axios';
//Eigen componenten importeren
import UserinfoFriends from "./UserinfoFriends";
//CSS importeren
import './UserinfoFriends.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;

class Friend extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: props.username,
      profilepicture: null,
    }
  }

  componentDidMount(){
    this.getUserInfoFromApi();
  }

  getUserInfoFromApi(){
    axios.get(base_url + "userinfo/" + this.state.username + api_token).then(res => {
      this.setState({profilepicture: res.data.picture});
    });
  }

  render(){
    return(
      <div className="friend">
        <UserinfoFriends profielfoto={this.state.profilepicture} naam={this.state.username}></UserinfoFriends>
      </div>
    )
  }
}

export default Friend;
