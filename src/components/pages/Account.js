//React en benodigheden importeren
import React from 'react';
import axios from "axios";
//Redux importeren
import { connect } from "react-redux";
import { changeUserName } from "./../../actions";
//Eigen componenten importeren
import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';
import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import Reistraject from '../account/Reistraject';
//CSS importeren
import './Account.css';

class Account extends React.Component{
  state = { interests:[], profilePicture: "", travelFrom: "", travelTo: "", displayname: ""};
  BASE_URL = "http://136.144.230.97:8080/api/";
  api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";
  username = this.props.userName;

  componentDidMount(){
    //Userinfo api -> profielfoto, van, naar
    axios.get(this.BASE_URL + "userinfo/" + this.username + this.api_token).then(res => {
      console.log(res.data.name);
      this.setState({
        profilePicture: res.data.picture,
        travelFrom: res.data.from,
        travelTo: res.data.to,
        displayname: res.data.name,
      });
    });

    //Interests api -> interests array
    axios.get(this.BASE_URL + "interests/" + this.username + this.api_token).then(res => {
      console.log(res.data);
      this.setState({
        interests: res.data
      });
    });
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="accountPageContainer">
          <UserInfo profielfoto={this.state.profilePicture} naam={this.state.displayname}></UserInfo>
          <Reistraject van={this.state.travelFrom} naar={this.state.travelTo}></Reistraject>
          <Interests interests={this.state.interests}></Interests>
        </div>
        <BottomNav />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {userName: state.userName};
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(Account);

//export default Account;
