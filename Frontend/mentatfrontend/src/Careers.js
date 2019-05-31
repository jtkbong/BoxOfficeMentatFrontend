import React, { Component } from 'react';

class CareersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{ height: "1000px", width: "750px" }}>
                <br />
                <h5><b>Software Engineer Intern</b></h5>
                <p>Would you like to help me build Box Office Mentat? There is a large amount of work to do on
                    both the frontend and the backend. You will be building complex UI features on the frontend
                    and REST APIs to serve up the correct data on the backend. The ideal candidate will be an
                    aspiring full-stack developer.
                </p>
                <p>
                    Box Office Mentat's stack consists of HTML/JavaScript (ReactJS), Python (Flask) and MySQL. 
                    There is also a weekly-scheduled worker component that is written completely in Python and
                    hosted as a Lambda function in AWS.
                </p>
                <p><b>Desired Skills</b></p>
                <ul>
                    <li>Proficient with any object-oriented programming language such as C# or Java.</li>
                    <li>Demonstrated problem-solving and communication skills.</li>
                    <li>Experience with relational databases such as MySQL is a huge plus.</li>
                    <li>Experience with cloud technologies such as AWS or Azure is a bonus.</li>
                </ul>
                <p><b>Minimum Qualifications</b></p>
                <ul>
                    <li>Enrollment in computer science, computer engineering or equivalent program is required.</li>
                    <li>An interest in film or comic books is required!</li>
                </ul>
                <p>Note that this is an unpaid internship, but I will teach you everything I know about software development.
                 Please send your application to <a href="mailto: jeremybong@live.com">jeremybong@live.com</a>.</p>
            </div>
        );
    }
}

export default CareersPage;