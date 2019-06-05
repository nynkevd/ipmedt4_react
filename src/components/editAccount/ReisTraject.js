import React from 'react';

class ReisTraject extends React.Component{
  constructor(props){
    super(props);
    this.state = {from: props.from, to: props.to };
  }

  stations = [
    "Leiden",
    "Voorschoten",
    "Alphen aan den Rijn",
    "Nieuw Vennep",
    "De Vink"
  ];

  render(){
    return(
      <div>
        <label className="labelEditAccount">Reistraject</label>
        <form action="">
          <label className="errorMessage hideErrorMessage" id="fromErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.from} onChange={this.props.setFrom} className="selectTraject">
            {this.stations.map((station) =>
              <option value={station} key={station}>{station}</option>
            )}
          </select>

          <img src="./img/icons/double-arrow.svg" alt="Van/naar pijltjes" className="doubleArrow"/>

          <label className="errorMessage hideErrorMessage" id="toErrorMessage">De stations kunnen niet hetzelfde zijn</label>
          <select value={this.props.to} onChange={this.props.setTo} className="selectTraject">
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
