import React from 'react';
import ReactDOM from 'react-dom';
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp } from './containers';
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
            {/* <IndexRoute component={Landing}/> */}
            <IndexRoute component={InfoInput}/> 
            <Route path="/main" component={MainPage}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/sendInfo" component={SendInfo}/>
            <Route path="/introduce" component={Introduce}/>
            <Route path="/input" component={InputLayout}>
            <Route path="/signup" component={SignUp}/>
            <Route path="/Classification" component={Classification}/>
            <Route path="/InfoInput" component={InfoInput}/>
            <Route path="/GradeInput" component={GradeInput}/>
            <Route path="/Preview" component={Preview}/>
            </Route>
        </Route>
    </Router>, rootElement);