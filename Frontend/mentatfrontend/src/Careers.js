import React, { Component } from 'react';

class CareersPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div style={{height: "1000px", width: "750px"}}>
            <br/>
                <h5><b>Senior Software Engineer - Frontend (Intern)</b></h5>
                <p>Box Office Mentat is looking for a Senior Frontend Developer Intern, whatever that means...
                    There's a lot of work to do on the UX side of things and I don't have enough time to do all
                    that and catch up on Netflix. You will have this great opportunity to contribute to a super
                    fun project like Box Office Mentat!
                </p>
                <p><b>Desired Skills</b></p>
                <ul>
                    <li>Expert at JavaScript obviously. I expect you to know ecmascript 24</li>
                    <li>Can write a for loop without looking up Stackoverflow</li>
                    <li>AWS or Azure would be great, but if you want to host this on your Macbook Air that's fine too</li>
                </ul>
                <p><b>Minimum Qualifications</b></p>
                <ul>
                    <li>Bootcamp is fine if you have done at least 100 problems on leetcode</li>
                    <li>You are the creator of ReactJS</li>
                    <li>Bachelor's/Master's/PHD in Computer Science, Kinesiology, Liberal Arts, Music or equivalently useless</li>
                    <li>Extensively knowledge of Marvel's 616 universe. 1610 is acceptable</li>
                </ul>
                <br/>
                <h5><b>Software Engineer - Backend (Intern)</b></h5>
                <p>Box Office Mentat is looking for a Backend Developer Intern to write some crappy Python code because.
                    You will have the opportunity to write really cool code that steals data from websites with movie information!
                </p>
                <p><b>Desired Skills</b></p>
                <ul>
                    <li>Literal God in MySQL</li>
                    <li>Can write a for loop in Python without looking up Stackoverflow</li>
                    <li>Excellent selfie-taking skills</li>
                    <li>Master league or higher in Starcraft II or Heroes of the Storm</li>
                </ul>
                <p><b>Minimum Qualifications</b></p>
                <ul>
                    <li>36 years of professional software development experience</li>
                    <li>PhD in astrophysics</li>
                    <li>Can operate a coffee machine</li>
                    <li>Extensively knowledge of Marvel's 616 universe. 1610 is acceptable</li>
                </ul>
                <br/>
                <p>Note that all jobs are unpaid, and this is merely a parody. Please send all applications to <a href="mailto: zacksnydersucks@gmail.com">zacksnydersucks@gmail.com</a></p>
			</div>
		);
	}
}

export default CareersPage;