import React from 'react';

class UserName extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: props.username};
  }

  onChange = (event) => {
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }

  onSubmit = (event) =>{
    event.preventDefault();
    this.props.onSubmit(this.state.username);
    console.log("Submit");
    console.log(this.state.username);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <label className="labelEditAccount">Gebruikersnaam</label>
          <input type="text" value={this.state.username} className="inputUsername" onChange={this.onChange}></input>
        </form>
      </div>
    )
  }
}

export default UserName;
