//React importeren
import React from "react";
//CSS importeren
import './MyInterests.css';

class MyInterests extends React.Component {

  deleteOnClick = (event) => {
    var interestsList = document.getElementById("interestsList").childNodes;

    var deleteItem = document.getElementById(event.target.id).id;
    console.log(document.getElementById(deleteItem));
    document.getElementById(deleteItem).parentElement.setAttribute("class", "hidden")
    //var interest = document.getElementById(event.target.id);
    console.log("Verwijder: " + deleteItem);
  }

  render() {
    return (
      <div id="interestsList">
      <ul className="interestsList">
        {
          this.props.interests.map((interest, index) =>
            <li className="interest" key={index}>{interest}  <img onClick={this.deleteOnClick} id={interest} className="icon" src="./img/icons/trash.svg" alt=""/></li>
          )
        }
      </ul>
      </div>
    )
  }
}

export default MyInterests;
