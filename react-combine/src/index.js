import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { FinishPage } from './containers';
import reducer from './reducers';
import InputLayout from './components/InputLayout';

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
            <IndexRoute component={FinishPage} />
        </Route>
    </Router>
, rootElement);