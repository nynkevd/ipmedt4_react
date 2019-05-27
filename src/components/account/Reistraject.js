import React from 'react';

const Reistraject = (props) => {
  return(
    <div>
      <h3>Standaard reistraject</h3>
      <ul>
        <li>van: {props.van}</li>
        <li>naar: {props.naar}</li>
      </ul>
    </div>
  );
}

export default Reistraject;
