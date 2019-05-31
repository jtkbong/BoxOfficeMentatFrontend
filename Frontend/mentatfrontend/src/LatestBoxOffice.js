import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LatestBoxOffice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };
    }

    componentDidMount() {
        this.getLatest();
    }

    getLatest() {
        const url = process.env.REACT_APP_API_URL + "boxoffice/latest";
        fetch(url, { mode: 'cors' })
            .then(response => response.json())
            .then(data => {
                data.records.sort(this.compareGross);
                data.records.reverse();
                this.setState({
                    records: data.records
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

    render() {
        return (
            <div key="latestBoxOffice" style={{ margin: "10px 0px 20px 0px" }}>
                {this.state.records.length > 0 &&
                    <React.Fragment>
                        <div key="latestHeader" style={{ marginBottom: "10px" }}>
                        <b>
                            <h4>Lastest Box Office</h4>
                            <h5>{this.state.records[0].startDate} to {this.state.records[0].endDate}</h5></b>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Movie</th>
                                    <th style={{paddingLeft: "20px"}}>Gross</th>
                                    <th style={{paddingLeft: "20px"}}>Theater Count</th>
                                </tr>
                                {this.state.records.map(record =>
                                    <tr key={record.movieId + "-latest"}>
                                        <td><Link to={'/movie/' + record.movieId}>{record.movieName}</Link></td>
                                        <td align="right">${this.intToTextAmount(record.gross)}</td>
                                        <td align="right">{record.theaterCount}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default LatestBoxOffice;