//React importeren
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
  changeChatroomClicked,
} from './../../actions';
// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';
//CSS importeren
import './TopBarChat.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class TopBarChat extends React.Component {
  state = {picture: null}

  componentDidMount(){
    this.getProfilePicture();
    console.log(this.state.picture);
  }

  getProfilePicture = () =>{
    axios.get(base_url + "userinfo/" + this.props.clickedChatroom.createdByUserId + api_token).then(res => {
      this.setState({picture: res.data.picture});
    });
  }

  render(){
    return(
      <div className="topBarChat">
        <Link to='/chat' className="chatCardLink">
          <img className="topBarChat__back" src="./img/icons/arrow_back.svg" alt="Terug"/>
        </Link>
        <img className="topBarChat__img" src={this.state.picture} alt="Profielfoto"/>
        <p className="topBarChat__text">{getRoomName(this.props.clickedChatroom, this.props.chatKitUser)}</p>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    clickedChatroom: state.clickedChatroom,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
  changeChatroomClicked: changeChatroomClicked,
})(TopBarChat);
