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
			studioId: null,

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
			const url = process.env.REACT_APP_API_URL + "genres";
			fetch(url, { mode: 'cors' })
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
			studioId: document.getElementById('studioId').value,
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
			width: "200px"
		};

		return (
			<div style={{ height: "100%" }}>
				<table>
					<tbody>
						<tr>
							<td>Title</td>
							<td><input type="text" id="title" /></td>
						</tr>
						<tr>
							<td>Studio</td>
							<td><input type="text" id="studioId" /></td>
						</tr>
						<tr>
							<td>Genre</td>
							<td><div style={genreOptionsStyle}><Select id="genre"
								options={this.state.genres}
								value={this.state.selectedGenre}
								onChange={(option) => this.handleGenreOptionChange(option)}
								onFocus={this.loadGenreOptions}
							/></div></td>
						</tr>
						<tr>
							<td>Release Date</td>
							<td><DatePicker id="releasedDate"
								selected={this.state.selectedDate}
								onChange={this.handleReleasedDateChange} /></td>
						</tr>
					</tbody>
				</table>
				<button className="searchButtonStyle" onClick={this.handleSearchClick}>Search</button>
				<br />
				<MovieResults
					title={this.state.title} studioId={this.state.studioId}
					releasedDate={this.state.releasedDate} genre={this.state.genre} />
			</div>
		);
	}
}

export default MovieSearchPane;