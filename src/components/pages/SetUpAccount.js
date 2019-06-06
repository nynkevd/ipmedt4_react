//React en benodigdheden importeren
import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
//Redux importeren
import { connect } from 'react-redux';
import { changeUserName } from "./../../actions";

class SetUpAccount extends React.Component{

  updateFirstLogin = _ => {
    //Checken van ingevoerde wachtwoord met de database
    axios.get(`http://136.144.230.97:4000/updatefirstlogin?username=${this.props.userName}`)
        .catch(err => console.error(err))
  }

  render(){
    return(
      <div>
      <Link to="/search">
        <input
          className="button--login"
          type="submit"
          value="Opslaan"
          onClick={this.updateFirstLogin} />
      </Link>
        </div>
    )
  };
}
const mapStateToProps = state =>{
  return{
    userName: state.userName,
  };
}

export default connect(mapStateToProps,{
  changeUserName: changeUserName,
})(SetUpAccount);
