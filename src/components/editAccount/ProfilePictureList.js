//React importeren
import React from "react";
//Eigen componenten importeren
import ProfilePicture from '../editAccount/ProfilePicture';

class ProfilePictureList extends React.Component{
  constructor(props){
    super(props);
    this.state = {pictureList: props.profilePictureList};
  }

  pictureOnClick = (event) => {
    var picturesList = document.getElementById("profilePicturesContainer").childNodes;

    picturesList.forEach(function(picture){
      var image = picture.childNodes;
      image[0].classList.remove("selected");
    });

    var clickedPicture = document.getElementById(event.target.id);
    clickedPicture.classList.add("selected");

    this.setState({profilePicture: event.target.id});

    // Src van de profielfoto die in de database moet komen
    console.log(clickedPicture.getAttribute("src"));
  }


  render(){
    return(
      <div>
        <label className="labelEditAccount">Profielfoto</label>
        <div className="profilePictures" id="profilePicturesContainer">
        {
          this.props.pictureList.map((picture, index) =>
            <ProfilePicture picture={picture} className="profilePicture" click={this.pictureOnClick} key={index} index={index}/>
          )
        }
        </div>
      </div>

    )
  }
}

export default ProfilePictureList;
