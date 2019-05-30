import React from 'react';

class UserName extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: this.props.username}
  }

  setUsername = (event) =>{
    this.setState({username: event.target.value});
  }

  render(){
    return(
      <div>
        <form>
          <input type="text" value={this.state.username} onChange={this.setUsername}></input>
        </form>
      </div>
    )
  }
}

export default UserName;
