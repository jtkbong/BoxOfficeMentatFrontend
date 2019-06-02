import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import { Axis, axisPropsFromTickScale, LEFT, BOTTOM } from 'react-d3-axis';
import Util from './Util';

class BoxOfficeComparer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieIds: [],
            movie1Id: "captainamerica",
            movie2Id: "marvel14b",
            movie1: null,
            movie2: null,
            size: [1200, 500]
        };
        this.addMovieIdToList = this.addMovieIdToList.bind(this);
    }

    componentDidMount() {
        const url1 = process.env.REACT_APP_API_URL + "movie/" + this.state.movie1Id;
        fetch(url1, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movie1: data
                });
            });

        const url2 = process.env.REACT_APP_API_URL + "movie/" + this.state.movie2Id;
        fetch(url2, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movie2: data
                });
            });
    }

    addMovieIdToList() {
        const movieId = document.getElementById('movieId').value;
        const li = document.createElement('li');
        li.innerHTML = movieId;
        document.getElementById('movieIdList').appendChild(li);
        this.setState(prevState => {
            prevState.movieIds.push(movieId);
            return {movieIds: prevState.movieIds}
        });
    }

    render() {
        if (this.state.movie1 && this.state.movie2) {
            const movie1MaxWeekCount = d3.max(this.state.movie1.weeks, week => week.weekNumber);
            const movie2MaxWeekCount = d3.max(this.state.movie2.weeks, week => week.weekNumber);
            const maxWeekCount = Math.min(movie1MaxWeekCount, movie2MaxWeekCount);
            const xScale = scaleLinear()
                .domain([1, maxWeekCount + 1])
                .range([0, this.state.size[0]]);

            const movie1MaxGross = d3.max(this.state.movie1.weeks, week => week.gross);
            const movie2MaxGross = d3.max(this.state.movie2.weeks, week => week.gross);
            const maxGross = Math.max(movie1MaxGross, movie2MaxGross);
            const yScale = scaleLinear()
                .domain([0, maxGross * 1.2])
                .range([0, this.state.size[1]]);

            const yScaleReverse = scaleLinear()
                .domain([0, maxGross * 1.2])
                .range([this.state.size[1], 0]);

            const widthPerBar = this.state.size[0] / (maxWeekCount * 2);

            return (
                <div>
                    <React.Fragment>
                        <div><svg width="15" height="15">
                            <rect width="15" height="15" style={{ fill: "00BFFF" }} />
                        </svg>{this.state.movie1.name} vs
<svg width="15" height="15">
                                <rect width="15" height="15" style={{ fill: "FABFFF" }} />
                            </svg>{this.state.movie2.name}
                        </div>
                        <table>
                            <tr><td>Movie ID</td>
                            <td><input type="text" id="movieId" /></td>
                            <td><button onClick={this.addMovieIdToList}>Add</button></td>
                            </tr>
                        </table>
                        <ul id="movieIdList">

                        </ul>
                        

                        <svg key="barChartGraphic" width={this.state.size[0] + 100} height={this.state.size[1] + 100}>
                            <g transform="translate(80, 20)">
                                {
                                    this.state.movie1.weeks.map((week, i) => {
                                        if (i < maxWeekCount) {
                                            return <React.Fragment key={"fragment" + week.weekNumber}>
                                                <rect key={"week" + week.weekNumber}
                                                    x={widthPerBar * (week.weekNumber - 1)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    height={yScale(week.gross)}
                                                    width={widthPerBar / 2}
                                                    style={{ fill: "#00BFFF" }} >
                                                </rect>
                                                <text key={"weekText" + week.weekNumber}
                                                    x={widthPerBar * (week.weekNumber - 1)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    fontSize="10"
                                                    transform={"rotate(-90 " + widthPerBar * (week.weekNumber - 1) + " " + (this.state.size[1] - yScale(week.gross)) + ") translate(-90 10)"}
                                                >
                                                    {Util.intToDollarsText(week.gross)}
                                                </text>
                                            </React.Fragment>
                                        }
                                    }
                                    )
                                }
                                {
                                    this.state.movie2.weeks.map((week, i) => {
                                        if (i < maxWeekCount) {
                                            return <React.Fragment key={"fragment" + week.weekNumber}>
                                                <rect key={"week" + week.weekNumber}
                                                    x={widthPerBar * (week.weekNumber - 1) + (widthPerBar / 2)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    height={yScale(week.gross)}
                                                    width={widthPerBar / 2}
                                                    style={{ fill: "#FABFFF" }} >
                                                </rect>
                                                <text key={"weekText" + week.weekNumber}
                                                    x={widthPerBar * (week.weekNumber - 1) + (widthPerBar / 2)}
                                                    y={this.state.size[1] - yScale(week.gross)}
                                                    fontSize="10"
                                                    transform={"rotate(-90 " + widthPerBar * (week.weekNumber - 1) + (widthPerBar / 2) + " " + (this.state.size[1] - yScale(week.gross)) + ") translate(-90 10)"}
                                                >
                                                    {Util.intToDollarsText(week.gross)}
                                                </text>
                                            </React.Fragment>
                                        }
                                    }
                                    )
                                }
                            </g>
                        </svg>
                    </React.Fragment>
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }
}

export default BoxOfficeComparer;