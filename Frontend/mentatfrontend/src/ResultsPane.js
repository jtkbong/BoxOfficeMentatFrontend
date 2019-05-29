import React, { Component } from 'react';
import './App.css';
import StudioResults from './StudioResults'
import BoxOfficeResults from './BoxOfficeResults'
import PeopleSearchPane from './PeopleSearchPane'
import MovieSearchPane from './MovieSearchPane'
import TestPage from './TestPage'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class ResultsPane extends Component {

    getResultsPane() {
        switch(this.props.commandSelected) {
            case "studios":
                return (
                    <StudioResults />
                );
            case "movies":
                return (
                    <MovieSearchPane />
                );
            case "people":
                return (
                    <PeopleSearchPane />
                );
            case "test":
                return (
                    <TestPage />
                );
            default:
                return (
                    <div style={{height:"500px"}} />
                );
        }
    }
	
	render() {

        const resultsPaneStyle = {
            "margin": "20px 0px 20px 20px"
        }

		return (
            <div style={resultsPaneStyle}>
                {this.getResultsPane()}
            </div>
		);
	}
}

export default ResultsPane;