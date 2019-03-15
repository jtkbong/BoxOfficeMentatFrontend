import React, { Component } from 'react';
import './App.css';

class ResultsPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div>
				<table>
				</table>
			</div>
		);
	}
}

class StudioList extends Component {

  constructor(props) {
    super(props);
    this.state = {
		studios: []
    };
  }
  
  getStudios() {
	  fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/studios", {mode: 'cors'})
	  .then(response => response.json())
	  .then(data => {
		let studios = data.studios.map((studio) => {
			return (
				<li key={studio} value={studio}>{studio}</li>
			)
		})
		this.setState({studios: studios })
	  });
  }

	render() {	  
		this.getStudios();
		return (
			<div>
				<ul>
					{this.state.studios}
				</ul>
			</div>
		);
  }
}

class MovieSearchPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: null,
		};
	}
	
	handleClick() {
		this.setState({ title: document.getElementById('title').value });

	}
	
	render() {
		return (
			<div>
				Movie Name: <input type="text" id="title" />
				<br/>
				<button onClick={() => this.handleClick()} >Search</button>
				<MoviesResults title={this.state.title} />>
			</div>
		);
	}
}

class MoviesResults extends Component {
	/*constructor(props) {
		super(props);
		console.log("props", props);
		this.state = {
			title: null,
			movies: []
		};
	}*/
	
	render() {
		var title = this.props.title;
		var movieItems = null;
		fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/movies?title=" + title, {mode: 'cors'})
			.then(response => response.json())
			.then(data => {
				movieItems = data.movies.map((movie) => {					
					return (
						<tr>
							<td>{movie.name}</td>
							<td>{movie.studio}</td>
							<td>{movie.releasedDate}</td>
							<td>{movie.domesticGross}</td>
						</tr>
					)
				});
			//this.setState({movies: data.movies});
		});

		return (
			<div>
				<table>
					{movieItems}
				</table>
			</div>
		);
	}
}

class ActorsPane extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			actors: []
		};
	}
	
	getActors() {
		var name = this.state.name;
		fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/people?name=" + name, {mode: 'cors'})
			.then(response => response.json())
			.then(data => {
				let people = data.people.map((person) => {
					return (
						<li key={person.name} value={person.id} onClick={() => this.showActorMovies(person.id)}>{person.name}</li>
					)
				})
			this.setState({actors: people })
		});
	}
	
	handleClick() {
		this.setState({
			name: document.getElementById('name').value,
			actors: []
		});
		console.log("name", this.state.name);
		this.getActors();
	}
	
	textboxOnChange() {
		this.setState({ name: document.getElementById('name').value });
	}
	
	showActorMovies(id) {
		fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/moviesByActor?actorId=" + id, {mode: 'cors'})
			.then(response => response.json())
			.then(data => {				
				return (
					<MoviesResults movies={data.movies} />
				)			
		});
	}
	
	render() {
		return (
		
			<div>
				Actor Name: <input type="text" id="name" onChange={() => this.textboxOnChange()} />
				<br/>
				<button onClick={() => this.handleClick()} >Search</button>
				<ul>
					{this.state.actors}
				</ul>
			</div>
		);
	}
}

class BoxOfficePane extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	
	render() {
		return (
			<div>
				<table>
				</table>
			</div>
		);
	}
}

class CommandUI extends Component {
	
	render() {
		
		if(this.props.commandSelected === "studios") {
			return (
				<StudioList />
			);
		}
		
		if(this.props.commandSelected === "movieSearch") {
			return (
				<div>
					<MovieSearchPane />
				</div>
			);
		}
		
		if(this.props.commandSelected === "actors") {
			return (
				<ActorsPane />
			);
		}
		
		if(this.props.commandSelected === "boxOffice") {
			return (
				<BoxOfficePane />
			);
		}
		
		return (
			<div>Please select a command!</div>
		);
	}
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			commandSelected: null,
			queryResults: []
		};
	}
	
	commandButtonClick(commandType) {
		this.setState({
			commandSelected: commandType,
			queryResults: []
		});
	}

	render() {
		return (	  
		  <div>
			<h1>Box Office Mentat</h1>
			<div>
				<button type="button" value="studios" onClick={() => this.commandButtonClick('studios')}>Studios</button>
				<button type="button" value="movieSearch" onClick={() => this.commandButtonClick('movieSearch')}>Movie Search</button>
				<button type="button" value="actors" onClick={() => this.commandButtonClick('actors')}>Actors</button>
				<button type="button" value="boxOffice" onClick={() => this.commandButtonClick('boxOffice')}>Box Office</button>
			</div>
			<CommandUI commandSelected={this.state.commandSelected} />
			<ResultsPane commandSelected={this.state.commandSelected} queryResults={this.state.queryResults} />
		  </div>
		);
	}
}

export default App;
