//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserName,
  changeLoggedIn,
  changeChatKitUser,
} from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
//CSS importeren
import './Chat.css';

class Chat extends React.Component{
  render(){
    console.log(this.props.chatKitUser);
    return this.props.loggedIn
      ? <div>
        <TopBar />
        <div className="chatPageContainer">
          <h1>Chat</h1>
        </div>
        <BottomNav />
      </div>
      //Naar de login pagina sturen als er niet ingelogd is
      : <Redirect to="/login" />
  }
}

const mapStateToProps = state =>{
  return {
    userName: state.userName,
    loggedIn: state.loggedIn,
    chatKitUser: state.chatKitUser,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
  changeLoggedIn: changeLoggedIn,
  changeChatKitUser: changeChatKitUser,
})(Chat);
