import React, { Component } from 'react';
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import "bootstrap-css-only/css/bootstrap.min.css";
//import "mdbreact/dist/css/mdb.css";
import { Link } from 'react-router-dom'
import "./css/sidebar.css"

class SideBar extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/studios">Studios</Link></li>
                    <li><Link to="/movies">Movies</Link></li>
                    <li><Link to="/people">People</Link></li>
                    <li><Link to="/comparer">Compare</Link></li>
                    {/*
                    <li><Link to="/test">Test</Link></li>
                    */}
                </ul>
            </div>
        );
    }
}

export default SideBar;