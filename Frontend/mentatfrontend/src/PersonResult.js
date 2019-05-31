import React, { Component } from 'react';
import MovieResults from './MovieResults';

class PersonResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            personId: null,
            person: null,
            personMovies: []
        };
    }

    componentDidMount() {
        const { personId } = this.props.match.params;
        this.getPerson(personId);
    }

    getPerson(personId) {
        const url = process.env.REACT_APP_API_URL + "person/" + personId;
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    personId: personId,
                    person: data
                });
            });
    }

    compareGross(a, b) {
        if (a.gross < b.gross) {
            return -1;
        }
        if (a.gross > b.gross) {
            return 1;
        }
        return 0;
    }

    intToTextAmount(val) {
        if (val) {
            return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.00', '');
        }
    }

    getOccupations(person) {
        var occupations = [];
        if (person.actor === 1) {
            occupations.push("Actor");
        }

        if (person.director === 1) {
            occupations.push("Director");
        }

        if (person.producer === 1) {
            occupations.push("Producer");
        }

        if (person.screenWriter === 1) {
            occupations.push("Writer");
        }

        return occupations.join(", ");
    }

    render() {
        return (
            <div key="personResult">
                {this.state.person &&
                    <React.Fragment>
                        <div key="personName" style={{ marginBottom: "10px" }}>
                            <b>
                                <h4 style={{ margin: "15px 0px 10px 0px" }}>{this.state.person.name}</h4>
                            </b>
                        </div>
                        <div key="personOccupations" style={{ marginLeft: "5px" }}>
                            {this.getOccupations(this.state.person)}
                        </div>
                        <h6 style={{marginTop: "10px", marginLeft: "2px"}}>Movies</h6>
                        <MovieResults personId={this.state.personId}/>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default PersonResult;