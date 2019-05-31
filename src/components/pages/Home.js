import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';

class Home extends React.Component{
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 3000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render(){
    return this.state.redirect
      ? <Redirect to="/login" />
      : <div>
        <div className="HomePage">
          <div className="HomePageContainer">
            <img className="HomePageImg" src="./img/NS_logo.png" alt="NS logo"/>
            <h1 className="HomePageText">Travel Buddy</h1>
          </div>
        </div>
      </div>
  }
}

export default Home;
