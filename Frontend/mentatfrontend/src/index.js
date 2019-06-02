import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieResult from './MovieResult'
import BoxOfficeMentatNavbar from './BoxOfficeMentatNavbar'
import SideBar from './SideBar'
import FooterPage from './FooterPage';
import MovieSearchPane from './MovieSearchPane'
import StudioResults from './StudioResults'
import StudioResult from './StudioResult'
import PeopleSearchPane from './PeopleSearchPane'
import PersonResult from './PersonResult'
import TestPage from './TestPage'
import AboutPage from './AboutPage'
import CareersPage from './Careers'
import CreditsPane from './CreditsPane'
import AboutCreator from './AboutCreator';
import BoxOfficeComparer from './BoxOfficeComparer';

const routing = (
    <Router>
        <div>
            <div>
                <BoxOfficeMentatNavbar />
            </div>
            <div id="container">
                <div id="sidebar">
                    <SideBar/>
                </div>
                <div id="content">
                    <Route exact path="/" component={App} />
                    <Route exact path="/studio/:studioId" component={StudioResult} />
                    <Route exact path="/studios" component={StudioResults} />
                    <Route exact path="/movies" component={MovieSearchPane} />
                    <Route exact path="/people" component={PeopleSearchPane} />
                    <Route exact path="/movie/:movieId" component={MovieResult} />
                    <Route exact path="/person/:personId" component={PersonResult} />
                    <Route exact path="/test" component={TestPage} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/jeremybong" component={AboutCreator} />
                    <Route exact path="/helpme" component={CareersPage} />
                    <Route exact path="/credits/:movieId" component={CreditsPane} />
                    <Route exact path="/comparer" component={BoxOfficeComparer} />
                </div>
            </div>
            <footer id="footer">
			<FooterPage />
            </footer>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
