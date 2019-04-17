import React, { Component } from 'react';
import MovieResults from './MovieResults';

class MovieSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({ title: document.getElementById('title').value });
	}
	
	render() {
		return (
			<div>
				Title: <input type="text" id="title" />
				<br/>
				<button onClick={this.handleClick}>Search</button>
				<MovieResults title={this.state.title} />
			</div>
		);
	}
}

export default MovieSearchPane;