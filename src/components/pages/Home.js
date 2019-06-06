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
          <div className="HomePageContainer">
            <img className="HomePageImg" src="./img/NS_logo.png" alt="NS logo"/>
            <h1 className="HomePageText">Travel Buddy</h1>
          </div>
        </div>
      </div>
  }
}

export default Home;
