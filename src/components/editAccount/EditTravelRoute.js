//React importeren
import React from 'react';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserTravelFrom,
  changeUserTravelTo
} from "./../../actions";

class EditTravelRoute extends React.Component{

  onChangeUserTravelFrom = event =>{
    this.props.from(event);
  }

  onChangeUserTravelTo = event =>{
    this.props.to(event);
  }

  render(){
    return(
      <div>
        <label className="labelEditAccount">Reistraject</label>
        <form action="">
          <label className="errorMessage hideErrorMessage" id="fromErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="selectTraject">
            {this.props.allStations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>

          <img src="./img/icons/double-arrow.svg" alt="Van/naar pijltjes" className="doubleArrow"/>

          <label className="errorMessage hideErrorMessage" id="toErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="selectTraject">
            {this.props.allStations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state =>{
  return{
    userTravelTo: state.userTravelTo,
    userTravelFrom: state.userTravelFrom,
    allStations: state.allStations,
  };
}

export default connect(mapStateToProps,{
  changeUserTravelFrom: changeUserTravelFrom,
  changeUserTravelTo: changeUserTravelTo,
})(EditTravelRoute);
