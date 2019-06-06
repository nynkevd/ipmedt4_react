//React importeren
import React from 'react';
//Eigen componenten importeren
import MatchCard from './MatchCard';

class Matches extends React.Component{

  render(){
    let matches = this.props.matches;
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
