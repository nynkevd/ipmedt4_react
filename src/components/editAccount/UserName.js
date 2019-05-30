import React from 'react';

class UserName extends React.Component{
  constructor(props){
    super(props);
  }
  
  setUsername = (event) =>{
    console.log(event);
  }

  render(){
    return(
      <div>
        <form>
          <input type="text" value={this.props.username} onChange={this.setUsername}></input>
        </form>
      </div>
    )
  }
}

export default UserName;
