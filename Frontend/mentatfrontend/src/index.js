import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieResult from './MovieResult'
import BoxOfficeMentatNavbar from './BoxOfficeMentatNavbar'
import SideNavBar from './SideNavBar'
import FooterPage from './FooterPage';
import MovieSearchPane from './MovieSearchPane'
import StudioResults from './StudioResults'
import StudioResult from './StudioResult'
import PeopleSearchPane from './PeopleSearchPane'
import TestPage from './TestPage'
import AboutPage from './AboutPage'
import CareersPage from './Careers'
import CreditsPane from './CreditsPane'

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
                    <Route exact path="/studio/:studioId" component={StudioResult} />
                    <Route exact path="/studios" component={StudioResults} />
                    <Route exact path="/movies" component={MovieSearchPane} />
                    <Route exact path="/people" component={PeopleSearchPane} />
                    <Route exact path="/movie/:movieId" component={MovieResult} />
                    <Route exact path="/test" component={TestPage} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/unpaidcareers" component={CareersPage} />
                    <Route exact path="/credits/:movieId" component={CreditsPane} />
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
