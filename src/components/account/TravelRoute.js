import React from 'react';
import './UserInfoAccount.css';

const TravelRoute = (props) => {
  return(
    <div className="travelRouteContainer">
      <h3 className="travelName">Standaard reistraject</h3>
      <ul className="whereFrom">
        <li>van: {props.from}</li>
        <li>naar: {props.to}</li>
      </ul>
    </div>
  );
}

export default TravelRoute;
