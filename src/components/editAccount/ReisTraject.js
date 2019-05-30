import React from 'react';

class ReisTraject extends React.Component{
  constructor(props){
    super(props);
    this.state = {from: props.from, to: props.to };
  }

  stations = [
    "Leiden",
    "Voorschoten",
    "Alphen",
    "Nieuw Vennep"
  ];

  setFrom = (event) => {
    console.log(event)
  }

  setTo = (event) => {
    console.log(event)
  }

  render(){
    return(
      <div>
        <h3>Standaard Reistraject</h3>
        <form action="">
          <label htmlFor="from">Van:</label>

          <select value={this.state.from} onChange={this.setFrom}>
            {this.stations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>

          <label htmlFor="to">Naar:</label>
          <select value={this.state.to} onChange={this.setTo}>
            {this.stations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>
        </form>
      </div>
    )
  }
}

export default ReisTraject;
