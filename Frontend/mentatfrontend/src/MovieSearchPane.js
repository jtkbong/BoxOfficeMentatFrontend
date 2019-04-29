import React, { Component } from 'react';
import MovieResults from './MovieResults';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class MovieSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			studio: null,
			selectedDate: new Date(2017, 3, 28),
			releasedDate: null
		};
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleReleasedDateChange = this.handleReleasedDateChange.bind(this);
	}
	
	handleSearchClick() {
		console.log("HERE " + document.getElementById('releasedDate').selected);
		this.setState({ 
			title: document.getElementById('title').value,
			studio: document.getElementById('studio').value,
			releasedDate: this.state.selectedDate
		});
	}

	handleReleasedDateChange(date) {
		this.setState({
			selectedDate: date
		});
	}
	
	render() {
		return (
			<div>
				Title: <input type="text" id="title" />
				<br/>
				Studio: <input type="text" id="studio" />
				<br/>
				Release Date: <DatePicker id="releasedDate" 
					selected={this.state.selectedDate} 
					onChange={this.handleReleasedDateChange}/>
				<br/>
				<button onClick={this.handleSearchClick}>Search</button>
				<MovieResults 
					title={this.state.title} studio={this.state.studio} releasedDate={this.state.releasedDate}/>
			</div>
		);
	}
}

export default MovieSearchPane;