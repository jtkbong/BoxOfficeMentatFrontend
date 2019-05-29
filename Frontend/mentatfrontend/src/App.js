import React, { Component } from 'react';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
//import { style } from 'react-toastify';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commandSelected: null
		};
		this.commandButtonClick = this.commandButtonClick.bind(this);
	}
	
	commandButtonClick(commandType) {
		this.setState({
			commandSelected: commandType
		});
	}

	render() {

		return (	  
			<div style={{height: "500px"}}>
		  </div>
		);
	}
}

export default App;
