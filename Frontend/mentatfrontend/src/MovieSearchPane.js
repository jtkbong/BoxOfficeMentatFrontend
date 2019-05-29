import React, { Component } from 'react';
import MovieResults from './MovieResults';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

class MovieSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
			studio: null,
			
			selectedDate: null,
			releasedDate: null,

			genreOptionsLoaded: false,
			genres: [],
			selectedGenre: '',
			genre: null
		};
		
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.handleReleasedDateChange = this.handleReleasedDateChange.bind(this);
		this.loadGenreOptions = this.loadGenreOptions.bind(this);
	}

	loadGenreOptions(input, callback) {
		if (!this.state.genreOptionsLoaded) {
			this.setState({ optionsLoaded: true });
			fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/genres", {mode: 'cors'})
				.then(response => response.json())
				.then(data => {
					let options = data.genres.map(genre => ({
						value: genre,
						label: genre
					}));
					this.setState({
						genreOptionsLoaded: true,
						genres: options
					});
				});
		}
	}
	
	handleSearchClick() {
		this.setState({ 
			title: document.getElementById('title').value,
			studio: document.getElementById('studio').value,
			releasedDate: this.state.selectedDate,
			genre: this.state.selectedGenre.value
		});
	}

	handleReleasedDateChange(date) {
		this.setState({
			selectedDate: date
		});
	}

	handleGenreOptionChange(option) {
		this.setState({
			selectedGenre: option
		});
	}

	render() {
	
		const genreOptionsStyle = {
			width: "400px"
		};

		return (
			<div style={{height: "500px"}}>
				Title: <input type="text" id="title" />
				<br/>
				Studio: <input type="text" id="studio" />
				<br/>
				Genre: 
				<div style={genreOptionsStyle}><Select id="genre" 
					options={this.state.genres}
					value={this.state.selectedGenre}
					onChange={(option) => this.handleGenreOptionChange(option)}
					onFocus={this.loadGenreOptions}
				/>
				</div>
				<br/>
				Release Date: 
				<DatePicker id="releasedDate" 
					selected={this.state.selectedDate} 
					onChange={this.handleReleasedDateChange}/>
				<br/>
				<button onClick={this.handleSearchClick}>Search</button>
				<MovieResults 
					title={this.state.title} studio={this.state.studio}
					releasedDate={this.state.releasedDate} genre={this.state.genre}/>
			</div>
		);
	}
}

export default MovieSearchPane;