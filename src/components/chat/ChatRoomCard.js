// React en benodigdheden importeren
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// Redux importeren
import { connect } from "react-redux";
import {
  changeChatKitUser,
  changeCurrentChatroom,
} from "./../../actions";
// getRoomName methode importeren
import {getRoomName} from './methodsChat.js';
//Eigen componenten importeren
import UnreadMessageCount from './UnreadMessageCount';
// css importeren
import './ChatRoomCard.css';

const base_url = "https://api.ovtravelbuddy.nl/api/";
const api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

class ChatRoomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      lastMessage: "",
      lastMessageTime: "",
      room: props.room,
      picture: "",
    };
  }

  componentDidMount(){
    this.getLastMessage();
    this.getProfilePicture();
  }

  getLastMessage(){
    this.props.chatKitUser.fetchMessages({
      roomId: this.props.room.id,
      direction: 'older',
      limit: 1,
    }).then(messages => {
      // Als er geen berichten zijn kan het niet geladen worden
      if(messages.length !== 0){
        this.getLastMessageTime(messages[0]);

        this.setState({
          lastMessage: messages[0].text,
        })
      }

    })
  }

  getLastMessageTime(message){
    // Deze functie is echt veeel te lang
    var createdAt = message.createdAt;

    // Datum van het laatste bericht
    var date = createdAt.split('T')[0].split('-');
    date[0] = parseInt(date[0], 10);
    date[1] = parseInt(date[1], 10);
    date[2] = parseInt(date[2], 10);

    // Tijdstip van het bericht
    var time = createdAt.split('T')[1].split('Z')[0].split(':');
    // timezone loopt 2 uur achter
    // Zet een 0 voor de tijd
    time[0] = ("0" + time[0]).slice(-2);
    time[1] = ("0" + time[1]).slice(-2);

    //2 uur bij de tel optellen
    switch (time[0]){
      case "22":
        time[0] = "00";
        break;
      case "23":
        time[0] = "01";
        break;
      case "24":
        time[0] = "02";
        break;
      default:
        time[0] = parseInt(time[0])+2;
        break;
    }

    // Datum van vandaag
    var d = new Date();

    // Als het de datum van vandaag is wordt alleen de tijd weergegeven
    if(date[0] === d.getFullYear() && date[1] === (d.getMonth() + 1) && date[2] === d.getDate()){
      this.setState({
        lastMessageTime: time[0] + ":" + time[1],
      });
    }else{
      // Anders wordt de datum weergegeven
      this.setState({
        lastMessageTime: date[2] + "-" + date[1] + "-" + date[0],
      });
    }

  }

  onClick = () => {
    this.props.changeCurrentChatroom(this.props.room);
  }

  getProfilePicture = () =>{
    axios.get(base_url + "userinfo/" + getRoomName(this.state.room, this.props.chatKitUser) + api_token).then(res => {
      this.setState({picture: res.data.picture});
    });
  }

  render(){
    return(
      <Link to='/chatRoom' className="chatCardLink">
        <div className="chatCardContainer" onClick={this.onClick}>
          <img className="chatCardContainer__img" src={"https://api.ovtravelbuddy.nl" + this.state.picture} alt="Profielfoto"/>
          <h3 className="chatCardContainer__name">{getRoomName(this.props.room, this.props.chatKitUser)}</h3>
          <p className="chatCardContainer__message">{this.state.lastMessage}</p>
          <span className="chatCardContainer__time">{this.state.lastMessageTime}</span>

          {/* unreadCount is een varaibele die door chatkit wordt bijgehouden met het aantal ongelezen berichten*/}
          <UnreadMessageCount unreadMessages={this.props.room.unreadCount}/>
        </div>
      </Link>
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
})(ChatRoomCard);
