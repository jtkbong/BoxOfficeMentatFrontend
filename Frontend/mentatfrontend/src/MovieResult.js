import React, { Component } from 'react';
import W2WBoxOfficeBarChart from './W2WBoxOfficeBarChart'
import CreditsPane from './CreditsPane'

class MovieResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId: null,
            weeks: []
        };
    }

    checkNormalWeek(week) {
        return week.weekNumber >= 1;
    }

    componentDidMount() {
        const { movieId } = this.props.match.params;
        const url = process.env.REACT_APP_API_URL + "movie/" + movieId;
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                const filteredWeeks = data.weeks.filter(this.checkNormalWeek);
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
                    weeks: filteredWeeks
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
            <div key="movieStats">
                <h4 style={{ margin: "15px 0px 10px 0px" }}>{this.state.name}</h4>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: "170px" }}><b>Studio</b></td>
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
                        {this.state.weeks.length > 0 &&
                            <tr>
                                <td><b>Opening Week</b></td>
                                <td>${this.intToTextAmount(this.state.weeks[0].gross)}</td>
                            </tr>
                        }
                        <tr>
                            <td><b>Weeks in Theaters</b></td>
                            <td>{this.state.weeks.length}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <CreditsPane movieId={this.state.movieId} />
                <W2WBoxOfficeBarChart key="w2wChart" data={this.state.weeks} size={[600, 150]} />
            </div>
        );
    }
}

export default MovieResult;