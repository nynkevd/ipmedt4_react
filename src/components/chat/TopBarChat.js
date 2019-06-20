//React importeren
import React from 'react';
import axios from 'axios';
// Redux importeren
import { connect } from 'react-redux';
import {
  changeChatKitUser,
  changeCurrentChatroom,
} from './../../actions';
// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';
//CSS importeren
import './TopBarChat.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = process.env.REACT_APP_API_TOKEN;

class TopBarChat extends React.Component {
  state = {picture: null}

  componentDidMount(){
    this.getProfilePicture();
    this.setState({
      picture: "",
    })
    console.log(this.state.picture);
  }

  getProfilePicture = () =>{
    axios.get(base_url + "userinfo/" + getRoomName(this.props.currentChatroom, this.props.chatKitUser) + api_token).then(res => {
      this.setState({picture: res.data.picture});
    });
  }

  // Als er op de terug knop wordt geklikt, wordt de huidige chatroom ""
  changeChatroom = () =>{
    this.props.changeCurrentChatroom("");
    console.log(this.props.currentChatroom);

    //redirect naar chat
  }

  render(){
    return(
      <div className="topBarChat">

        <img className="topBarChat__back" src="./img/icons/arrow_back.svg" alt="Terug" onClick={this.changeChatroom}/>

        <img className="topBarChat__img" src={"https://api.ovtravelbuddy.nl" + this.state.picture} alt="Profielfoto"/>
        <p className="topBarChat__text">{getRoomName(this.props.currentChatroom, this.props.chatKitUser)}</p>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    chatKitUser: state.chatKitUser,
    currentChatroom: state.currentChatroom,
  };
}

export default connect(mapStateToProps,{
  changeChatKitUser: changeChatKitUser,
  changeCurrentChatroom: changeCurrentChatroom,
})(TopBarChat);
