import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MovieResults extends Component {

    constructor(props) {
        super(props);
            this.state = {
            movies: []
        };
    }

    componentWillReceiveProps(props) {
        if (!(props.title === null && props.studio === null && props.releasedDate === null && props.genre === null)) {
            var params = [];
            if (props.title) {
                params.push("title=" + props.title);
            }
            if (props.studio) {
                params.push("studio=" + props.studio);
            }
            if (props.genre) {
                params.push("genre=" + props.genre);
            }
            if (props.releasedDate) {
                params.push("releaseYear=" + props.releasedDate.getFullYear());
                params.push("releaseMonth=" + (props.releasedDate.getMonth() + 1));
                params.push("releaseDay=" + props.releasedDate.getDate());
            }
            fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/movies?" + params.join('&'), {mode: 'cors'})
                .then(response => response.json())
                .then(data => {
                        this.setState({movies: data.movies});
            });
        }
    }

	render() {

        const columnStyle = {
            "textAlign": "left",
            "padding": "2px 10px 2px 10px"   
        }

        return (
			<div>
                {this.state.movies.length > 0 &&
				<table>
                    <tbody>
                        <tr>
                            <th style={columnStyle}>Title</th>
                            <th style={columnStyle}>Studio</th>
                            <th style={columnStyle} >Genre</th>
                            <th style={columnStyle}>Released Date</th>
                            <th style={columnStyle}>Domestic Gross</th>
                        </tr>
                        {this.state.movies.map(movie => 
                        <tr key={movie.name}>
                            <td style={columnStyle}><Link to={'movie/' + movie.id}>{movie.name}</Link></td>
                            <td style={columnStyle}>{movie.studio}</td>
                            <td style={columnStyle}>{movie.genre}</td>
                            <td style={columnStyle}>{movie.releasedDate}</td>
                            <td align='right'>${movie.domesticGross}</td>
                        </tr>    
                        )}
                    </tbody>
				</table>
                }
			</div>
		);
	}
}

export default MovieResults;