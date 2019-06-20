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
  }

  getProfilePicture = () =>{
    // Vraagt de profielfoto van de andere gebruiker op. getRoomName is een functie die in methodsChat.js staat.
    axios.get(base_url + "userinfo/" + getRoomName(this.props.currentChatroom, this.props.chatKitUser) + api_token).then(res => {
      this.setState({picture: res.data.picture});
    });
  }

  // Als er op de terug knop wordt geklikt, wordt de huidige chatroom "", hierdoor wordt het component in Chat.js automatisch veranderd van ChatRoom naar ChatList
  changeChatroom = () =>{
    this.props.changeCurrentChatroom("");
  }

  render(){
    return(
      <div className="topBarChat">
        {/*Back Arrow*/}
        <img className="topBarChat__back" src="./img/icons/arrow_back.svg" alt="Terug" onClick={this.changeChatroom}/>
        {/*Profielfoto van de andere gebruiker*/}
        <img className="topBarChat__img" src={"https://api.ovtravelbuddy.nl" + this.state.picture} alt="Profielfoto"/>
        {/*Naam van de andere gebruiker*/}
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
