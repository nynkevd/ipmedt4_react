import React from 'react';
import './UserInfo.css';

const Reistraject = (props) => {
  return(
    <div className="travelRouteContainer">
      <h3 className="travelName">Standaard reistraject</h3>
      <ul className="whereFrom">
        <li>van: {props.van}</li>
        <li>naar: {props.naar}</li>
      </ul>
    </div>
  );
}

export default Reistraject;
