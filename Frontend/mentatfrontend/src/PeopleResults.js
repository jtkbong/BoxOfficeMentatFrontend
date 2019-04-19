import React, { Component } from 'react';

class PeopleResults extends Component {

    constructor(props) {
        super(props);
            this.state = {
            people: []
        };
    }

    componentWillReceiveProps(props) {
        var name = props.name;
		fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/people?name=" + name, {mode: 'cors'})
			.then(response => response.json())
			.then(data => {
				this.setState({people: data.people })
		});
    }

    getOccupations(isActor, isDirector, isProducer, isScreenWriter) {
        var occupations = [];
        if (isActor) {
            occupations.push("Actor");
        }

        if (isDirector) {
            occupations.push("Director");
        }

        if (isProducer) {
            occupations.push("Producer");
        }

        if (isScreenWriter) {
            occupations.push("Screen Writer");
        }

        return occupations.join(',');
    }

	render() {
		return (
			<div>
				<table>
                    <tbody>
                        <tr>
                            <th align='left'>Name</th>
                            <th align='left'>Occupation</th>
                        </tr>
                        {this.state.people.map(person => 
                        <tr key={person.name}>
                            <td>{person.name}</td>
                            <td>{this.getOccupations(person.actor, person.director, person.producer, person.screenWriter)}</td>
                        </tr>    
                        )}
                    </tbody>
				</table>
			</div>
		);
	}
}

export default PeopleResults;