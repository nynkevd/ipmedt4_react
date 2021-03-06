//React importeren
import React from "react";
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserProfilePicture,
  changeProfilePictureList,
} from "./../../actions";
//Eigen componenten importeren
import ProfilePicture from '../editAccount/ProfilePicture';
//CSS importeren
import "./ProfilePictureList.css";

class ProfilePictureList extends React.Component{

  pictureOnClick = (event) => {
    var picturesList = document.getElementById("profilePictures").childNodes;

    picturesList.forEach(function(picture){
      var image = picture.childNodes;
      image[0].classList.remove("selected");
    });

    var clickedPicture = document.getElementById(event.target.id);
    clickedPicture.classList.add("selected");

    var clickedPictureId = parseInt(event.target.id.toString().slice(-1));
    this.props.changeUserProfilePicture(clickedPictureId+1);
  }


  render(){
    return(
      <div className="profilePictureList" id="profilePictures">
      {
        this.props.profilePictureList.map((picture, index) =>
          <ProfilePicture picture={picture} onClick={this.pictureOnClick} key={index} index={index}/>
        )
      }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    userProfilePicture: state.userProfilePicture,
    profilePictureList: state.profilePictureList,
  };
}

export default connect(mapStateToProps,{
  changeUserProfilePicture: changeUserProfilePicture,
  changeProfilePictureList: changeProfilePictureList,
})(ProfilePictureList);
