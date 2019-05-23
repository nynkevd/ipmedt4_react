import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './BottomNavItem.css';

class BottomNavItem extends React.Component{
  render(){
    return(
      <Link className="bottomNavItem" to={this.props.link}>
        <div>
          <img className="bottomNavItemImg" src={this.props.icon} />
          <br />
          <p className="bottomNavItemText">{this.props.name}</p>
        </div>
      </Link>
    )
  }
}

export default BottomNavItem;
