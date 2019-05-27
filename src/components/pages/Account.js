import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import UserInfo from '../account/UserInfo';
import Interests from '../account/Interests';
import Reistraject from '../account/Reistraject';

import './Account.css';

import axios from "axios";

class Account extends React.Component{
  state = { interests:[] };

  componentDidMount(){
    console.log("mount");
    var base_url = "http://127.0.0.1:8000/api/interests/";
    var api_token = "?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

    axios.get(base_url + "anouk" + api_token).then(res => {
      let interests = res.data;
      this.setState({interests: interests});
    });
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="accountPageContainer">
          <UserInfo profielfoto="https://is4-ssl.mzstatic.com/image/thumb/Purple128/v4/54/4f/9b/544f9b86-5073-2793-f825-699c9f547375/AppIcon-1x_U007emarketing-0-85-220-0-5.png/246x0w.jpg" naam="Anouk"></UserInfo>
          <Reistraject van="Voorschoten" naar="Leiden Centraal"></Reistraject>
          <Interests interests={this.state.interests}></Interests>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Account;
