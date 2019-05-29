import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import MovieResult from './MovieResult'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

class SideNavBar extends Component {
	
	render() {
        const sideNavbarStyle = {
            "position": "absolute",
            "left": "0",
            "top": "0",
            "padding": "10px",
            "width": "150px",
            "height": "100%",
            "background": "#00bfff",
            "color": "#00bfff"
        }

		return (
			<div style={sideNavbarStyle}>
                <ul>
                    <li><button onClick={(e) => this.props.clickHandler('studios') }>Studios</button></li>
                    <li><button onClick={(e) => this.props.clickHandler('movies') }>Movies</button></li>
                    <li><button onClick={(e) => this.props.clickHandler('people') }>People</button></li>
                    <li><button onClick={(e) => this.props.clickHandler('test') }>Test</button></li>
                </ul>
            </div>
		);
	}
}

export default SideNavBar;