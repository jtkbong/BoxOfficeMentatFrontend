import React, { Component } from 'react';
import './App.css';
import SideNavBar from './SideNavBar'
import ResultsPane from './ResultsPane'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import BoxOfficeMentatNavbar from './Navbar'
import FooterPage from './FooterPage';
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
			<React.Fragment>
		  	<div>
				<div>
					<BoxOfficeMentatNavbar/>
				</div>
				<div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
					<div >
						<SideNavBar clickHandler={this.commandButtonClick}/>
					</div>
					<div style={{ position: "relative", left: "150px"}}>
						<ResultsPane commandSelected={this.state.commandSelected} />
					</div>
				</div>
		 	</div>
		  	<div>
			  	<FooterPage />
		  	</div>
		  </React.Fragment>
		);
	}
}

export default App;
