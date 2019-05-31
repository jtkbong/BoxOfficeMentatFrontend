import React, { Component } from 'react';

class AboutCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div style={{ height: "500px", width: "700px" }}>
				<br />
				<h4>About Jeremy Bong</h4>
				<br />
				<p>I like Marvel. I like Gundam. I like watching movies.
				</p>
                <p>Man of Steel is not a good movie.</p>
			</div>
		);
	}
}

export default AboutCreator;