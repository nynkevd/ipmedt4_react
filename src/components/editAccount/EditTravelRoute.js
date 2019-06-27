//React importeren
import React from 'react';
//Redux importeren
import { connect } from "react-redux";
import {
  changeUserTravelFrom,
  changeUserTravelTo
} from "./../../actions";
//CSS importeren
import "./EditTravelRoute.css";

class EditTravelRoute extends React.Component{

  onChangeUserTravelFrom = event =>{
    this.props.from(event);
  }

  onChangeUserTravelTo = event =>{
    this.props.to(event);
  }

  render(){
    return(
      <div className="editTravelRouteContainer"></div>
      //   <h1 className="editTravelRouteContainer__title">Verander uw reistraject</h1>
      //   <form action="">
      //     <span className="editTravelRouteContainer__routeTo">van: </span>
      //     <select value={this.props.userTravelFrom} onChange={this.onChangeUserTravelFrom} className="editTravelRouteContainer__routeChoose">
      //       {this.props.allStations.map((station) =>
      //         <option value={station} key={station}>{station}</option>
      //       )}
      //     </select>
      //     <span className="editTravelRouteContainer__routeFrom">naar: </span>
      //     <select value={this.props.userTravelTo} onChange={this.onChangeUserTravelTo} className="editTravelRouteContainer__routeChoose">
      //       {this.props.allStations.map((station) =>
      //         <option value={station} key={station}>{station}</option>
      //       )}
      //     </select>
      //   </form>
      //   <div className="editTravelRouteContainer__errorMessage editTravelRouteContainer__errorMessage--hide" id="routeErrorMessage">
      //   <p className="editTravelRouteContainer__errorMessage__text">De stations kunnen niet hetzelfde zijn</p>
      //   </div>
      // </div>
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
