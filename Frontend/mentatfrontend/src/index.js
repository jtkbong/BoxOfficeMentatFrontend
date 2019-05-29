import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieResult from './MovieResult'
import BoxOfficeMentatNavbar from './Navbar'
import SideNavBar from './SideNavBar'
import FooterPage from './FooterPage';
import MovieSearchPane from './MovieSearchPane'
import StudioResults from './StudioResults'
import PeopleSearchPane from './PeopleSearchPane'
import TestPage from './TestPage'

const routing = (
    <Router>
        <div>
            <div>
                <BoxOfficeMentatNavbar />
            </div>
            <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
                <div >
                    <SideNavBar/>
                </div>
                <div style={{ position: "relative", left: "150px" }}>
                    <Route exact path="/" component={App} />
                    <Route exact path="/studios" component={StudioResults} />
                    <Route exact path="/movies" component={MovieSearchPane} />
                    <Route exact path="/people" component={PeopleSearchPane} />
                    <Route exact path="/movie/:movieId" component={MovieResult} />
                    <Route exact path="/test" component={TestPage} />
                </div>
            </div>
            <div>
			  	<FooterPage />
		  	</div>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
