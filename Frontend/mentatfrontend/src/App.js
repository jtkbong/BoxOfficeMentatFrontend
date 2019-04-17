import React, { Component } from 'react';
import './App.css';
import StudioResults from './StudioResults'
import BoxOfficeResults from './BoxOfficeResults'
import PeopleSearchPane from './PeopleSearchPane'
import MovieSearchPane from './MovieSearchPane'
import TestPage from './TestPage'

class CommandUI extends Component {
	
	render() {
		
		if(this.props.commandSelected === "studios") {
			return (
				<StudioResults />
			);
		}
		
		if(this.props.commandSelected === "movieSearch") {
			return (
				<MovieSearchPane />
			);
		}
		
		if(this.props.commandSelected === "actors") {
			return (
				<PeopleSearchPane />
			);
		}
		
		if(this.props.commandSelected === "boxOffice") {
			return (
				<BoxOfficeResults />
			);
		}

		if(this.props.commandSelected === "test") {
			return (
				<TestPage />
			);
		}
		
		return (
			<div>Please select a command!</div>
		);
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commandSelected: null
		};
	}
	
	commandButtonClick(commandType) {
		this.setState({
			commandSelected: commandType
		});
	}

	render() {
		return (	  
		  <div>
			<h1>Box Office Mentat</h1>
			<div>
				<button type="button" value="studios" onClick={() => this.commandButtonClick('studios')}>Studios</button>
				<button type="button" value="movieSearch" onClick={() => this.commandButtonClick('movieSearch')}>Movie Search</button>
				<button type="button" value="actors" onClick={() => this.commandButtonClick('actors')}>Actors</button>
				<button type="button" value="boxOffice" onClick={() => this.commandButtonClick('boxOffice')}>Box Office</button>
				<button type="button" value="test" onClick={() => this.commandButtonClick('test')}>Test</button>
			</div>
			<CommandUI commandSelected={this.state.commandSelected} />
		  </div>
		);
	}
}

export default App;
