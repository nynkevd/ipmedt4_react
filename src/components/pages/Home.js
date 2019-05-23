import React from 'react';

import './Home.css';

class Home extends React.Component{
  render(){
    return(
      <div className="HomePage">
        <img className="HomePageImg" src="./img/NS_logo.png" />
        <h1 className="HomePageText">Travel Buddy</h1>
      </div>
    )
  }
}

export default Home;
