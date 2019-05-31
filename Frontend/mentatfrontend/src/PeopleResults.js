import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PeopleResults extends Component {

    constructor(props) {
        super(props);
            this.state = {
            people: []
        };
    }

    componentWillReceiveProps(props) {
        const name = props.name;
        const url = process.env.REACT_APP_API_URL + "people?name=" + name
		fetch(url, {mode: 'cors'})
			.then(response => response.json())
			.then(data => {
				this.setState({people: data.people })
		});
    }

    getOccupations(person) {
        var occupations = [];
        if (person.actor === 1) {
            occupations.push("Actor");
        }

        if (person.director === 1) {
            occupations.push("Director");
        }

        if (person.producer === 1) {
            occupations.push("Producer");
        }

        if (person.screenWriter === 1) {
            occupations.push("Writer");
        }

        return occupations.join(", ");
    }

	render() {
		return (
			<div>
                {this.state.people.length > 0 &&
				<table>
                    <tbody>
                        <tr>
                            <th align='left'>Name</th>
                            <th align='left'>Occupation</th>
                        </tr>
                        {this.state.people.map(person => 
                        <tr key={person.name}>
                            <td><Link to={'/person/' + person.id}>{person.name}</Link></td>
                            <td>{this.getOccupations(person)}</td>
                        </tr>    
                        )}
                    </tbody>
				</table>
                }
			</div>
		);
	}
}

export default PeopleResults;