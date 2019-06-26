//React en benodigheden importeren
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
//CSS importeren
import './NotFoundPage.css';

class NotFoundPage extends React.Component{
  state = { redirect: false }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render(){
    return this.state.redirect
      ? <Redirect to="/login" />
      : <Link to="/login">
          <div className="notFoundPage">
            <div className="notFoundPage__container">
              <p className="notFoundPage__container__text">Oops, deze pagina is niet beschikbaar</p>
              <img className="notFoundPage__container__img" src="./img/logoSad.svg" alt="Travel Buddy Sad Logo"/>
              <p className="notFoundPage__container__text">U wordt binnen 5 seconden doorverwezen naar de login pagina.</p>
            </div>
          </div>
        </Link>
  }
}

export default NotFoundPage;
