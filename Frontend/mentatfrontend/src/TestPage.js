import React, { Component } from 'react';
import MovieResult from './MovieResult'

class TestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div>
                <MovieResult/>
			</div>
		);
	}
}

export default TestPage;