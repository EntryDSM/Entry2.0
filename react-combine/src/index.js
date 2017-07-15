import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './containers/Landing';
import MainPage from './containers/MainPage';
import LoginForm from './containers/LoginForm';
import SendInfo from './containers/SendInfo';
import Introduce from './containers/Introduce';
import InfoInput from './containers/InfoInput';

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
            {/* <IndexRoute component={Landing}/> */}
            <IndexRoute component={InfoInput}/> 
            <Route path="/main" component={MainPage}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/sendInfo" component={SendInfo}/>
            <Route path="/introduce" component={Introduce}/>
        </Route>
    </Router>, rootElement);