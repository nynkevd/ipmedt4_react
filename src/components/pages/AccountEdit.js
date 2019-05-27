import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import ProfilePicture from '../editAccount/ProfilePicture';
import UserName from '../editAccount/UserName';
import ReisTraject from '../editAccount/ReisTraject';

import './AccountEdit.css';

import axios from "axios";

class Chat extends React.Component{
  state = { profilePicture: "profilePicture0",  pictureList: []}

  componentDidMount(){
    var picturesUrl = "http://127.0.0.1:8000/api/pictures?api_token=rx7Mi675A1WDEvZPsGnrgvwkCEeOKlrX7rIPoXocluBKnupp9A02OLz7QcSL";

    axios.get(picturesUrl).then(res => {
      this.setState({pictureList: res.data});
    });
  }



  stations = [
    "Leiden Centraal",
    "De Vink",
    "Voorschoten",
    "Den Haag Mariahoeve",
    "Den Haag Laan van NOI",
    "Den Haag Centraal"
  ];

  username = "Anouk";


  pictureOnClick = (event) => {
    var picturesList = document.getElementById("profilePicturesContainer").childNodes;

    picturesList.forEach(function(picture){
      var image = picture.childNodes;
      image[0].classList.remove("selected");
    });

    var clickedPicture = document.getElementById(event.target.id);
    clickedPicture.classList.add("selected");

    this.setState({profilePicture: event.target.id});

    // Profielfoto moet aangepast worden in de database
  }

  render(){
    return(
      <div>
        <TopBar />
        <div className="accountEditPageContainer">
          <h1>Edit account</h1>
          <div className="profilePictures" id="profilePicturesContainer">
            {
              this.state.pictureList.map((picture, index) =>
                <ProfilePicture picture={picture} className="profilePicture" click={this.pictureOnClick} key={index} index={index} />
              )
            }
          </div>
          <UserName />
          <ReisTraject />

        </div>
        <BottomNav />
      </div>
    )
  }
}

export default Chat;
