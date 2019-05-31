import React, { Component } from 'react';

class CreditsPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieId: null,
            credits: []
        };
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            const { movieId } = this.props.match.params;
            this.getCredits(movieId);
        }
    }

    componentWillReceiveProps(props) {
        this.getCredits(props.movieId);
    }

    getCredits(movieId) {
        const url = process.env.REACT_APP_API_URL + "credits/" + movieId;
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movieId: movieId,
                    credits: data.credits
                });
            });
    }

    render() {
        const directors = this.state.credits.filter(credit => credit.relationship === "Director");
        const actors = this.state.credits.filter(credit => credit.relationship === "Actor");
        const producers = this.state.credits.filter(credit => credit.relationship === "Producer");
        const writers = this.state.credits.filter(credit => credit.relationship === "Writer");

        return (
            <div key="movieCredits" style={{margin: "10px 0px 20px 0px"}}>
            <div key="creditsHeader"><b>Credits</b></div>
                <table>
                    <tbody>
                        {directors.length > 0 &&
                            <tr>

                                <td style={{ width: "65px" }}><b>Directors</b></td>
                                <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                    directors.map(credit => credit.name).join(", ")
                                }</td>

                                }
                        </tr>
                        }
                        {actors.length > 0 &&
                            <tr>
                                <td style={{ width: "65px" }}><b>Actors</b></td>
                                <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                    actors.map(credit => credit.name).join(", ")
                                }</td>
                            </tr>
                        }
                        {producers.length > 0 &&
                            <tr>
                                <td style={{ width: "65px" }}><b>Producers</b></td>
                                <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                    producers.map(credit => credit.name).join(", ")
                                }</td>
                            </tr>
                        }
                        {writers.length > 0 &&
                            <tr>
                                <td style={{ width: "65px" }}><b>Writers</b></td>
                                <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                    writers.map(credit => credit.name).join(", ")
                                }</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CreditsPane;