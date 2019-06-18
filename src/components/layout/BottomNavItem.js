//React en benodigheden importeren
import React from 'react';
import { NavLink } from 'react-router-dom';
//CSS importeren
import './BottomNavItem.css';

class BottomNavItem extends React.Component{
  render(){
    return(
      <NavLink className="bottomNavItem" activeClassName="bottomNavItem--selected" to={this.props.link}>
        <div>
          <img className="bottomNavItem__img" src={this.props.icon} alt="Icon dat hoort bij de pagina"/>
          <br />
          <p className="bottomNavItem__text">{this.props.name}</p>
        </div>
      </NavLink>
    )
  }
}

export default BottomNavItem;
