import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './containers/Landing';
import MainPage from './containers/MainPage';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={Landing}/>
            <Route path="/Main" component={MainPage}/>
        </Route>
    </Router>, rootElement);