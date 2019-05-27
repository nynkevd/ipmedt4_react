import React from 'react';

class Interests extends React.Component{
  constructor(props){
    super(props);
  }

  interestsList = this.props.interests.map((interest) =>
    <li key={interest}>{interest}</li>
  );

  render(){
    return(
      <div>
        <h3>Interesses</h3>
        <ul>
          {this.interestsList}
        </ul>
      </div>
    );
  }
}

export default Interests;
