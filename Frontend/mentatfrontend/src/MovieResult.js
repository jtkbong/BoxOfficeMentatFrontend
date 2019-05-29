import React, { Component } from 'react';
import BarChart from './BarChart'
import * as d3 from 'd3';

const margin = { top: 100, right: 100, bottom: 100, left: 100 };
const width = 700;
const height = 100;

class MovieResult extends Component {

    xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
    yScale = d3.scaleLinear().range([0, width / 2]);
    lineGenerator = d3.line();

    constructor(props) {
        super(props);
        this.state = {
            movieId: null,
            weeks: [],
            bardata: []
        };
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        console.log(movieId); 

        fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/movie/" + movieId, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                const timeDomain = d3.extent(data.weeks, week => week.weekNumber);
                const maxWeekCount = d3.max(data.weeks, week => week.weekNumber);
                const maxGross = d3.max(data.weeks, week => week.gross);

                this.xScale.domain([0, maxWeekCount]);
                this.yScale.domain([0, maxGross]);

                this.lineGenerator.x(d => this.xScale(d.weekNumber));
                this.lineGenerator.y(d => this.yScale(d.gross));
                const grosses = this.lineGenerator(data.weeks);
                console.log("grosses: " + grosses);
                var nums = [];
                data.weeks.map(week => nums.push(week.gross));

                console.log("NUMS: " + nums);
                this.setState({
                    movieId: data.id,
                    name: data.name,
                    studio: data.studio,
                    domesticGross: data.domesticGross,
                    distributor: data.distributor,
                    releasedDate: data.releasedDate,
                    genre: data.genre,
                    runTime: data.runTime,
                    mpaaRating: data.mpaaRating,
                    productionBudget: data.productionBudget,
                    weeks: data.weeks,
                    grosses: grosses,
                    bardata: nums
                });
            });
    }

    intToTextAmount(val) {
        if (val) {
            return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
        }
    }

    render() {
        return (
            <div style={{ height: "500px" }}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: "170px" }}><b>Name</b></td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td><b>Studio</b></td>
                            <td>{this.state.studio}</td>
                        </tr>
                        <tr>
                            <td><b>Domestic Gross</b></td>
                            <td>${this.intToTextAmount(this.state.domesticGross)}</td>
                        </tr>
                        <tr>
                            <td><b>Distributor</b></td>
                            <td>{this.state.distributor}</td>
                        </tr>
                        <tr>
                            <td><b>Released Date</b></td>
                            <td>{this.state.releasedDate}</td>
                        </tr>
                        <tr>
                            <td><b>Genre</b></td>
                            <td>{this.state.genre}</td>
                        </tr>
                        <tr>
                            <td><b>Runtime</b></td>
                            <td>{this.state.runTime}</td>
                        </tr>
                        <tr>
                            <td><b>MPAA Rating</b></td>
                            <td>{this.state.mpaaRating}</td>
                        </tr>
                        <tr>
                            <td><b>Production Budget</b></td>
                            <td>${this.intToTextAmount(this.state.productionBudget)}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div><b>Weeks for Box Office:</b></div>
                {/*
                <table>
                    <tbody>
                {
                    this.state.weeks.map(week =>
                        <tr key={this.state.movieId + week.weekNumber}>
                            <td style={{width: "50px"}}>{week.weekNumber}</td>
                            <td style={{width: "100px"}}>{week.startDate}</td>
                            <td style={{width: "100px"}}>{week.endDate}</td>
                            <td style={{width: "150px"}}>${this.intToTextAmount(week.gross)}</td>
                            <td style={{width: "100px"}}>{week.theaterCount}</td>
                        </tr>
                    )
                }
                    </tbody>
                </table>
            
                <svg width={width} height={height}>
                    <path d={this.state.grosses} fill='none' stroke='blue' strokeWidth='5' />
                </svg>
            */}
                <BarChart data={this.state.weeks} size={[400, 200]} />
            </div>
        );
    }
}

export default MovieResult;