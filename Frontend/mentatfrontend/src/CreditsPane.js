import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        const directorsLength = directors.length;
        const actors = this.state.credits.filter(credit => credit.relationship === "Actor");
        const actorsLength = actors.length;
        const producers = this.state.credits.filter(credit => credit.relationship === "Producer");
        const producersLength = producers.length;
        const writers = this.state.credits.filter(credit => credit.relationship === "Writer");
        const writersLength = writers.length;

        return (
            <div key="movieCredits" style={{ margin: "10px 0px 20px 0px" }}>
                {this.state.credits.length > 0 &&
                    <React.Fragment>
                        <div key="creditsHeader" style={{ marginBottom: "10px" }}><b>Credits</b></div>
                        <table>
                            <tbody>
                                {directors.length > 0 &&
                                    <tr>
                                        <td style={{ width: "65px" }}><b>Directors</b></td>
                                        <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                            directors.map((credit, i) => {
                                                if (i + 1 === directorsLength) {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}</Link>
                                                } else {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}, </Link>
                                                }
                                            })
                                        }</td>
                                    </tr>
                                }
                                {actors.length > 0 &&
                                    <tr>
                                        <td style={{ width: "65px" }}><b>Actors</b></td>
                                        <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                            actors.map((credit, i) => {
                                                if (i + 1 === actorsLength) {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}</Link>
                                                } else {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}, </Link>
                                                }
                                            })
                                        }</td>
                                    </tr>
                                }
                                {producers.length > 0 &&
                                    <tr>
                                        <td style={{ width: "65px" }}><b>Producers</b></td>
                                        <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                            producers.map((credit, i) => {
                                                if (i + 1 === producersLength) {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}</Link>
                                                } else {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}, </Link>
                                                }
                                            })
                                        }</td>
                                    </tr>
                                }
                                {writers.length > 0 &&
                                    <tr>
                                        <td style={{ width: "65px" }}><b>Writers</b></td>
                                        <td style={{ width: "500px", paddingLeft: "10px" }}>{
                                            writers.map((credit, i) => {
                                                if (i + 1 === writersLength) {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}</Link>
                                                } else {
                                                    return <Link key={credit.personId} to={"/person/" + credit.personId}>{credit.name}, </Link>
                                                }
                                            })
                                        }</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default CreditsPane;