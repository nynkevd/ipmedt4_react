import React from 'react';

import TopBar from '../layout/TopBar';
import BottomNav from '../layout/BottomNav';

import UserinfoFriends from '../friendslist/UserinfoFriends';
import ReistrajectFriends from '../friendslist/ReistrajectFriends';
import InterestsFriends from '../friendslist/InterestsFriends';

import './FriendsList.css';

class FriendsList extends React.Component{
  render(){
    return(
      <div>
        <TopBar />
        <div className="friendsListPageContainer">
          <div className="friendsListPageContainer2">
              <UserinfoFriends profielfoto="https://via.placeholder.com/150" naam="Noa"></UserinfoFriends>
              <ReistrajectFriends van="Nieuw-Vennep" naar="Leiden Centraal"></ReistrajectFriends>
              <InterestsFriends interests={["Lezen", "TV Series"]}></InterestsFriends>
          </div>
          <hr className="LineBetweenFriends"/>

          <div className="friendsListPageContainer3">
              <UserinfoFriends profielfoto="https://via.placeholder.com/150" naam="Lara"></UserinfoFriends>
              <ReistrajectFriends van="Alphen aan den Rijn" naar="Leiden Centraal"></ReistrajectFriends>
              <InterestsFriends interests={["Programmeren", "Dieren"]}></InterestsFriends>
          </div>
          <hr className="LineBetweenFriends"/>

          <div className="friendsListPageContainer3">
              <UserinfoFriends profielfoto="https://via.placeholder.com/150" naam="Dayella"></UserinfoFriends>
              <ReistrajectFriends van="Nieuw-Vennep" naar="Leiden Centraal"></ReistrajectFriends>
              <InterestsFriends interests={["Lezen", "Dieren"]}></InterestsFriends>
          </div>
          <hr className="LineBetweenFriends"/>

          <div className="friendsListPageContainer3">
              <UserinfoFriends profielfoto="https://via.placeholder.com/150" naam="Nynke"></UserinfoFriends>
              <ReistrajectFriends van="Leiden Centraal" naar="Leiden Centraal"></ReistrajectFriends>
              <InterestsFriends interests={["Programmeren", "TV Series"]}></InterestsFriends>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }
}

export default FriendsList;
