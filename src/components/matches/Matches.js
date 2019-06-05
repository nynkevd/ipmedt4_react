//React en benodigheden importeren
import React from 'react';
//Eigen componenten importeren
import MatchCard from './MatchCard';

class Matches extends React.Component{
  constructor(props){
    super(props);
  }

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
