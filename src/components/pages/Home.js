//React en benodigheden importeren
import React from 'react';
import { Redirect } from 'react-router-dom';
//CSS importeren
import './Home.css';

class Home extends React.Component{
  state = { redirect: false }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 1500)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render(){
    return this.state.redirect
      ? <Redirect to="/login" />
      : <div>
        <div className="HomePage">
          <div className="HomePage__container">
            <img className="HomePage__container__img" src="./img/logo.svg" alt="Travel Buddy Logo"/>
            <h1 className="HomePage__container__text">Travel Buddy</h1>
          </div>
        </div>
      </div>
  }
}

export default Home;
