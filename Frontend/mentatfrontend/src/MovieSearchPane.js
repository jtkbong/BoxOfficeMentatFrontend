import React, { Component } from 'react';
import MovieResults from './MovieResults';

class MovieSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			studio: null
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({ 
			title: document.getElementById('title').value,
			studio: document.getElementById('studio').value 
		});
	}
	
	render() {
		return (
			<div>
				Title: <input type="text" id="title" />
				<br/>
				Studio: <input type="text" id="studio" />
				<br/>
				<button onClick={this.handleClick}>Search</button>
				<MovieResults title={this.state.title} studio={this.state.studio}/>
			</div>
		);
	}
}

export default MovieSearchPane;