import React, { Component } from 'react';

class MovieResults extends Component {

    constructor(props) {
        super(props);
            this.state = {
            movies: []
        };
    }

    componentWillReceiveProps(props) {
        
        var params = [];
        if (props.title) {
            params.push("title=" + props.title);
        }
        if (props.studio) {
            params.push("studio=" + props.studio);
        }
		fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/movies?" + params.join('&'), {mode: 'cors'})
			.then(response => response.json())
			.then(data => {
                    this.setState({movies: data.movies});
        });
    }

	render() {
		return (
			<div>
				<table>
                    <tbody>
                        <tr>
                            <th align='left'>Title</th>
                            <th align='left'>Studio</th>
                            <th align='left'>Released Date</th>
                            <th align='left'>Domestic Gross</th>
                        </tr>
                        {this.state.movies.map(movie => 
                        <tr key={movie.name}>
                            <td>{movie.name}</td>
                            <td>{movie.studio}</td>
                            <td>{movie.releasedDate}</td>
                            <td align='right'>${movie.domesticGross}</td>
                        </tr>    
                        )}
                    </tbody>
				</table>
			</div>
		);
	}
}

export default MovieResults;