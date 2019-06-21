//React importeren
import React from 'react';
//CSS importeren
import './TravelRoute.css';

const TravelRoute = (props) => {
  return(
    <div className="travelRouteContainer">
      <h3>Standaard reistraject</h3>
      <ul className="travelRouteContainer__route">
        <li>van: {props.from}</li>
        <li>naar: {props.to}</li>
      </ul>
    </div>
  );
}

export default TravelRoute;
