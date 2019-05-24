import React from 'react';
import {Link} from 'react-router-dom';

import './Home.css';

class Home extends React.Component{
  render(){
    return(
      <div>
        <Link className="HomePageLink" to="/loginorregister">
          <div className="HomePage">
            <div className="HomePageContainer">
              <img className="HomePageImg" src="./img/NS_logo.png" alt="NS logo"/>
              <h1 className="HomePageText">Travel Buddy</h1>
            </div>
            <p className="HomePageLinkTekst">Klik om verder te gaan</p>
          </div>
        </Link>
      </div>
    )
  }
}

export default Home;
