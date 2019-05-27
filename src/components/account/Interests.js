import React from 'react';

class Interests extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h3>Interesses</h3>
        <ul>
          {
            this.props.interests.map((interest, index) =>
              <li key={index}>{interest}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Interests;
