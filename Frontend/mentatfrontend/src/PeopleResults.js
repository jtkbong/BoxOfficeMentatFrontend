import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import './css/pagination.css'

class PeopleResults extends Component {

    static resultsPerPage = 20;

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            name: null,
            people: [],
            resultsCount: 0
        };
    }

    componentDidMount() {
        this.getPeople();
    }

    componentWillReceiveProps(props) {
        console.log(props.name);
        if (props.name !== this.state.name) {
            this.setState({
                name: props.name,
                people: [],
                pageNumber: 0
            }, () => {
                this.getPeople();
            });
        }
    }

    getPeople() {
        if (this.state.name) {

            const offset = this.state.pageNumber * PeopleResults.resultsPerPage;
            const offsetParam = "offset=" + offset;
            const nameParam = "name=" + this.state.name;
            const maxResultsParam = "maxResults=" + PeopleResults.resultsPerPage;
            const studiosQueryString = "?" + [maxResultsParam, offsetParam, nameParam].join("&");
            const url = process.env.REACT_APP_API_URL + "people" + studiosQueryString;
            fetch(url, { mode: 'cors' })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        people: data.people
                    })
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
            this.getPeople();
        });
    };

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

        if (this.state.people.length > 0) {
        const finalPageCount = Math.ceil(this.state.resultsCount / PeopleResults.resultsPerPage);

        return (
            <div id="react-paginate">
                {this.state.people.length > 0 &&
                    <table>
                        <tbody>
                            <tr>
                                <th align='left'>Name</th>
                                <th align='left'>Occupation</th>
                            </tr>
                            {this.state.people.map(person =>
                                <tr key={person.name}>
                                    <td><Link to={'/person/' + person.id}>{person.name}</Link></td>
                                    <td>{this.getOccupations(person)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
                <br />
                {this.state.people.length > 0 &&
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
            } else {
                return (
                    <div style={{ height: "550px" }} />
                );
            }
    }
}

export default PeopleResults;