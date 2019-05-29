import React, { Component } from 'react';

class AboutPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div style={{height: "500px", width: "700px"}}>
			<br/>
                <p>Box Office Mentat was inspired by (at least) two things: The question of whether 
					Avengers: Endgame could dethrone Avatar as the number one box office movie of all time 
					(because franchise dominance is important), 
					and by the Sci-Fi masterpiece Dune. In Dune, Mentats are basically human computers with blue eyes 
					(hence the blue theme of this site).
					While Box Office Mentat is certainly not a human, the word Mentat sounded really cool and
					being a fan of the novel, I just couldn't help myself!
				</p>
				<p>To be able to answer the first question, data was needed. And with the technological advances
					of machine learning, the box office predicting abilities of people like Scott Mendelson (who
					frequently shits on MCU movies) are no longer unique to movie industry analysts. 
				</p>
				<p>
					I hope to build Box Office Mentat into a platform that covers as many variables in the movie
					making business as possible, thus becoming a solvable machine learning problem. If you'd like
					to contribute to this project, please send an email to <a href="mailto: scottmendelsonsux@gmail.com">scottmendelsonsux@gmail.com</a>
				</p>
			</div>
		);
	}
}

export default AboutPage;