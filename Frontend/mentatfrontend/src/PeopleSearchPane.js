import React, { Component } from 'react';
import PeopleResults from './PeopleResults';

class PeopleSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: null,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.setState({ name: document.getElementById('name').value });
	}
	
	render() {
		return (
			<div style={{height: "500px"}}>
				Name: <input type="text" id="name" />
				<br/>
				<button onClick={this.handleClick}>Search</button>
				<PeopleResults name={this.state.name} />
			</div>
		);
	}
}

export default PeopleSearchPane;