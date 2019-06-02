import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Link } from 'react-router-dom'

class SideNavBar extends Component {

    render() {
        const sideNavbarStyle = {
            "position": "absolute",
            "left": "0",
            "top": "0",
            "padding": "5px",
            "width": "120px",
            "height": "100%",
            "background": "#00bfff",
            "color": "#00bfff"
        }

        return (
            <div style={sideNavbarStyle}>
                <ul>
                    <li><Link to="/studios">Studios</Link></li>
                    <li><Link to="/movies">Movies</Link></li>
                    <li><Link to="/people">People</Link></li>
                    <li><Link to="/comparer">Compare</Link></li>
                    <li><Link to="/test">Test</Link></li>
                </ul>
            </div>
        );
    }
}

export default SideNavBar;