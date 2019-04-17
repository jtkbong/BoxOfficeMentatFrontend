import React, { Component } from 'react';
import MovieResults from './MovieResults'

class TestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div>
                Test
                <MovieResults title="iron" />
			</div>
		);
	}
}

export default TestPage;