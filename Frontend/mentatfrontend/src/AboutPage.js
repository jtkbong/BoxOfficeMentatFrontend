import React, { Component } from 'react';

class AboutPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div style={{ height: "500px", width: "700px" }}>
				<br />
				<h4>About Box Office Mentat</h4>
				<br />
				<p>Box Office Mentat was inspired by (at least) two things: The question of whether
					Avengers: Endgame could dethrone Avatar as the number one box office movie of all time,
					and by the Sci-Fi masterpiece Dune. In Dune, Mentats are basically human computers with blue eyes
					(hence the blue theme of this site).
					While Box Office Mentat is certainly not a human, the word Mentat sounded really cool and
					being a fan of the novel, I just couldn't help myself!
				</p>
				<p>To be able to answer the first question, data was needed. And with the technological advances
					of machine learning, the box office predicting abilities of industry analysts are no longer unique to them.
				</p>
				<p>
					I hope to build Box Office Mentat into a platform that covers as many variables in the movie
					making business as possible, thus becoming a solvable machine learning problem. If you'd like
					to contribute to this project, please send an email to <a href="mailto: jeremybong@live.com">me</a>.
				</p>
			</div>
		);
	}
}

export default AboutPage;