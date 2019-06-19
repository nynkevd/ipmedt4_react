//React en benodigheden importeren
import React from 'react';
import { NavLink } from 'react-router-dom';
//CSS importeren
import './BottomNavItem.css';

const BottomNavItem = (props) =>{
  return(
    <NavLink className="bottomNavItem" activeClassName="bottomNavItem--selected" to={props.link}>
      <div>
        <img className="bottomNavItem__img" src={props.icon} alt="Icon dat hoort bij de pagina"/>
        <br />
        <p className="bottomNavItem__text">{props.name}</p>
      </div>
    </NavLink>
  );
}

export default BottomNavItem;
