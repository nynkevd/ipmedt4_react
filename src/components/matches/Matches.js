import React from 'react';
import MatchCard from './MatchCard';
import axios from "axios";

class Matches extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let matches = this.props.matches.matches;
    let matchList = [];

    for(var user in matches){
      matchList.push(<MatchCard user={user} interests={matches[user]} key={user}/>)
    }
    return(
      <div>
        {matchList}
      </div>

    );
  }

};

export default Matches
