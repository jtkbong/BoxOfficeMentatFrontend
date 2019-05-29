import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieResult from './MovieResult'

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/movie/:movieId" component={MovieResult}/>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));
registerServiceWorker();
