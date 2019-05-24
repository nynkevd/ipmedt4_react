import React from 'react';
import {NavLink} from 'react-router-dom';

import './BottomNavItem.css';

class BottomNavItem extends React.Component{
  render(){
    return(
      <NavLink className="bottomNavItem" activeClassName="bottomNavItemSelected" to={this.props.link}>
        <div>
          <img className="bottomNavItemImg" src={this.props.icon} alt="Icon dat hoort bij de pagina"/>
          <br />
          <p className="bottomNavItemText">{this.props.name}</p>
        </div>
      </NavLink>
    )
  }
}

export default BottomNavItem;
