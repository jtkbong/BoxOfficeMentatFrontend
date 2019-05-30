import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import './pagination.css';

class MovieResults extends Component {

    static resultsPerPage = 20;

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            movies: [],
            title: props.title,
            studioId: props.studioId,
            releasedDate: props.releasedDate,
            genre: props.genre,
            resultsCount: 0
        };
    }

    componentDidMount() {
        this.getMovies();
    }

    componentWillReceiveProps(props) {
        if (props.title !== this.state.title || props.studioId !== this.state.studioId ||
            props.genre !== this.state.genre || props.releasedDate !== this.state.releasedDate) {
            this.setState({
                pageNumber: 0,
                movies: [],
                title: props.title,
                studioId: props.studioId,
                releasedDate: props.releasedDate,
                genre: props.genre
            }, () => {
                this.getMovies();
            });
        }
    }

    getMovies() {
        if (this.state.title || this.state.studioId || this.state.genre || this.state.releasedDate) {
            var params = [];
            if (this.state.title) {
                params.push("title=" + this.state.title);
            }
            if (this.state.studioId) {
                params.push("studio=" + this.state.studioId);
            }
            if (this.state.genre) {
                params.push("genre=" + this.state.genre);
            }
            if (this.state.releasedDate) {
                params.push("releaseYear=" + this.state.releasedDate.getFullYear());
                params.push("releaseMonth=" + (this.state.releasedDate.getMonth() + 1));
                params.push("releaseDay=" + this.state.releasedDate.getDate());
            }

            params.push("maxResults=" + MovieResults.resultsPerPage);

            const offset = this.state.pageNumber * MovieResults.resultsPerPage;
            params.push("offset=" + offset);

            const url = process.env.REACT_APP_API_URL + "movies?" + params.join('&');

            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    this.setState({ movies: data.movies });
                });

            const countUrl = url + "&mode=count";

            fetch(countUrl, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    this.setState({ resultsCount: data.count });
                });
        }
    }

    handlePageClick = data => {
        this.setState({
            pageNumber: data.selected
        }, () => {
            this.getMovies();
        });
    };

    render() {

        const columnStyle = {
            "textAlign": "left",
            "padding": "2px 10px 2px 10px"
        }

        const finalPageCount = Math.ceil(this.state.resultsCount / MovieResults.resultsPerPage);

        return (
            <div id="react-paginate">
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
                                <tr key={movie.id}>
                                    <td style={columnStyle}><Link to={'/movie/' + movie.id}>{movie.name}</Link></td>
                                    <td style={columnStyle}>{movie.studio}</td>
                                    <td style={columnStyle}>{movie.genre}</td>
                                    <td style={columnStyle}>{movie.releasedDate}</td>
                                    <td align='right'>${movie.domesticGross}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
                <br />
                {this.state.movies.length > 0 &&
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        pageCount={finalPageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={this.handlePageClick}
                        activeClassName={'paginate-active'}
                    />
                }
            </div>
        );
    }
}

export default MovieResults;