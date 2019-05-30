import React, { Component } from 'react';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

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
			wut{process.env.REACT_APP_API_URL}
		  </div>
		);
	}
}

export default App;
