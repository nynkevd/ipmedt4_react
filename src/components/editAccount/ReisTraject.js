import React from 'react';

//Redux importeren
import { connect } from "react-redux";
import {
  changeUserTravelFrom,
  changeUserTravelTo
} from "./../../actions";

class ReisTraject extends React.Component{
  constructor(props){
    super(props);
    this.state = {from: props.from, to: props.to };
  }

  stations = [
    "Leiden",
    "Voorschoten",
    "Alphen aan den Rijn",
    "Nieuw Vennep",
    "De Vink"
  ];

  onChangeUserTravelFrom = event =>{
    this.props.changeUserTravelFrom(event.target.value);
    console.log(this.state.from);
  }

  onChangeUserTravelTo = event =>{
    this.props.changeUserTravelTo(event.target.value);
  }

  render(){
    return(
      <div>
        <label className="labelEditAccount">Reistraject</label>
        <form action="">
          <label className="errorMessage hideErrorMessage" id="fromErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="selectTraject">
            {this.stations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>

          <img src="./img/icons/double-arrow.svg" alt="Van/naar pijltjes" className="doubleArrow"/>

          <label className="errorMessage hideErrorMessage" id="toErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="selectTraject">
            {this.stations.map((station) =>
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
  };
}

export default connect(mapStateToProps,{
  changeUserTravelFrom: changeUserTravelFrom,
  changeUserTravelTo: changeUserTravelTo,
})(ReisTraject);
