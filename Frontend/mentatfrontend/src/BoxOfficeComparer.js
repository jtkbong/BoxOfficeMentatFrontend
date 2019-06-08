import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import { Axis, axisPropsFromTickScale, LEFT, BOTTOM } from 'react-d3-axis';
import Util from './Util';
import AsyncSelect from 'react-select/lib/Async';


class BoxOfficeComparer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMovieId: null,
            movies: {},
            size: [800, 400]
        };
        this.clearMovies = this.clearMovies.bind(this);
        this.addMovieIdToList = this.addMovieIdToList.bind(this);
        this.handleMovieSelectionChange = this.handleMovieSelectionChange.bind(this);
        this.loadMovieOptions = this.loadMovieOptions.bind(this);
    }

    clearMovies() {
        this.setState({
            movies: {}
        });
    }

    handleMovieSelectionChange(option) {
        this.setState({ selectedMovieId: option.value });
    }

    addMovieIdToList() {
        const movieId = this.state.selectedMovieId;
        this.addMovie(movieId);
        document.getElementById('movieId').selectedValue = null;
    }

    addMovie(movieId) {
        const url = process.env.REACT_APP_API_URL + "movie/" + movieId;
        fetch(url, { mode: 'cors' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return -1;
                }
            })
            .then(data => {
                if (data !== -1) {
                    this.setState(prevState => {
                        prevState.movies[movieId] = data;
                        return { movies: prevState.movies }
                    });
                }
            });
    }

    loadMovieOptions = (inputValue) => {
        return this.test(inputValue);
    }

    async test(inputValue) {
        var params = [];
        params.push("title=" + inputValue);
        params.push("maxResults=20");
        params.push("offset=0");

        const url = process.env.REACT_APP_API_URL + "movies?" + params.join('&');

        const movieOptions = await fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                let movieOptions = [];
                data.movies.map(movie =>
                    movieOptions.push({
                        label: movie.name,
                        value: movie.id
                    })
                );
                this.setState({
                    movieOptions: movieOptions
                })
                return movieOptions;
            });

        const results = await movieOptions;
        return results;
    }

    getColor(num) {
        const baseR = 15;
        const baseG = 40;
        const baseB = 200;
        const newR = num * baseR % 255;
        const newG = num * baseG % 255;
        const newB = num * baseB % 255;
        return "rgb(" + newR + "," + newG + "," + newB + ")";
    }

    render() {
        var movieEntries = Object.entries(this.state.movies);

        var maxWeekCount = movieEntries.length > 0 ? 2000 : 0;
        var maxWeekGross = 0;

        if (movieEntries.length > 0) {
            movieEntries.map(
                ([movieId, movie]) => {
                    const movieMaxWeekCount = d3.max(movie.weeks, week => week.weekNumber);
                    maxWeekCount = Math.min(maxWeekCount, movieMaxWeekCount);

                    const movieMaxWeekGross = d3.max(movie.weeks, week => week.gross);
                    maxWeekGross = Math.max(maxWeekGross, movieMaxWeekGross);

                    return null;
                })
        }

        const xScale = scaleLinear()
            .domain([1, maxWeekCount + 1])
            .range([0, this.state.size[0]]);

        const yScale = scaleLinear()
            .domain([0, maxWeekGross * 1.2])
            .range([0, this.state.size[1]]);

        const yScaleReverse = scaleLinear()
            .domain([0, maxWeekGross * 1.2])
            .range([this.state.size[1], 0]);

        const widthPerWeek = this.state.size[0] / maxWeekCount;
        var movieCount = 0;
        var movieColorCount = 0;

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Movie Name</td>
                            <td width="350px" style={{paddingLeft: "20px"}}>
                                <AsyncSelect id="movieId" loadOptions={this.loadMovieOptions} onChange={this.handleMovieSelectionChange} />
                            </td>
                            <td><button className="searchButtonStyle" onClick={this.addMovieIdToList}>Add</button></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <ul id="movieIdList">
                        {movieEntries.map(
                            ([movieId, movie]) => {
                                movieColorCount += 1;
                                return (
                                    <li key={movie.id} style={{ listStyle: "none" }}>
                                        <svg width={15} height={15} style={{ marginRight: "10px" }}>
                                            <rect width={15} height={15} style={{ fill: this.getColor(movieColorCount) }} />
                                        </svg>
                                        {movie.name}
                                    </li>);
                            }
                        )}
                    </ul>
                    {movieEntries.length > 0 &&
                        <button onClick={this.clearMovies}>Clear Data</button>
                    }
                </div>
                <React.Fragment>
                    <svg key="barChartGraphic" width={this.state.size[0] + 100} height={this.state.size[1] + 100}>
                        <g transform="translate(80, 20)">
                            {
                                movieEntries.map(([movieId, movie]) => {
                                    movieCount += 1;
                                    return (
                                        movie.weeks.map(week =>
                                            <React.Fragment key={"fragment" + movieId + week.weekNumber}>
                                                <rect
                                                    x={widthPerWeek * (week.weekNumber - 1) + (movieCount - 1) * (widthPerWeek / movieEntries.length)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    height={yScale(week.gross)}
                                                    width={widthPerWeek / movieEntries.length - 1}
                                                    style={{ fill: this.getColor(movieCount) }} >
                                                </rect>
                                                <text key={"weekText" + week.weekNumber}
                                                    x={5 + widthPerWeek * (week.weekNumber - 1) + (movieCount - 1) * (widthPerWeek / movieEntries.length)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    fontSize="10"
                                                    transform={"rotate(-30 " + (5 + widthPerWeek * (week.weekNumber - 1) + (movieCount - 1) * (widthPerWeek / movieEntries.length)) + " " + (this.state.size[1] - yScale(week.gross)) + ")"}
                                                >
                                                    {Util.intToDollarsText(week.gross)}
                                                </text>
                                            </React.Fragment>
                                        )
                                    );
                                })
                            }
                        </g>
                        <g transform="translate(80, 20)">
                            {movieEntries.length > 0 &&
                                <Axis key="yAxis" {...axisPropsFromTickScale(yScaleReverse, 4)} style={{ orient: LEFT }} />
                            }
                        </g>
                        <g transform={"translate(" + (80 + widthPerWeek / 2) + ", " + (20 + this.state.size[1]) + ")"}>
                            {movieEntries.length > 0 &&
                                <Axis key="xAxis" {...axisPropsFromTickScale(xScale, maxWeekCount + 1)} style={{ orient: BOTTOM }} />
                            }
                        </g>
                    </svg>
                </React.Fragment>
            </div>
        );
    }
}

export default BoxOfficeComparer;