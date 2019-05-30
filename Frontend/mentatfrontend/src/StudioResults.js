import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import './pagination.css';

class StudioResults extends Component {

    static resultsPerPage = 20;

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 0,
            studios: []
        };
    }

    componentDidMount() {
        this.getStudios();
    }

    getStudios() {
        const offset = this.state.pageNumber * StudioResults.resultsPerPage;
        const studiosQueryString = "?maxResults=" + StudioResults.resultsPerPage + "&offset=" + offset;
        fetch("http://boxofficementatservice-env.quumv36r5v.us-west-2.elasticbeanstalk.com/studios" + 
            studiosQueryString, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                this.setState({ 
                    studios: data.studios
                })
            });
    }

    handlePageClick = data => {
        this.setState({ pageNumber: data.selected }, () => {
            this.getStudios();
          });
    };

    render() {
        return (
            <div id="react-paginate">
                <table>
                    <tbody>
                        <tr>
                            <th align='left' style={{ width: "250px" }}>Studio</th>
                            <th align='left'>Movies Made</th>
                        </tr>
                        {this.state.studios.map(studio =>
                            <tr key={studio.id}>
                                <td><Link to={'studio/' + studio.id}>{studio.name}</Link></td>
                                <td align='right'>{studio.count}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br/>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={54}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    activeClassName={'paginate-active'}
                />
            </div>
        );
    }
}

export default StudioResults;