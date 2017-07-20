import React from 'react';
import ReactDOM from 'react-dom';
import SendComplete from './containers/SendComplete';
import ChangePw from './containers/ChangePw';
import 'babel-polyfill';
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp, FinalSubmit } from './containers';
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
            <IndexRoute component={Landing}/>  
            <Route path="/main" component={MainPage}/>
            <Route path="/login" component={LoginForm}/>

            <Route path="/sendinfo" component={SendInfo}/>
            <Route path="/sendcomplete" component={SendComplete}/>
            <Route path="/changepw" component={ChangePw}/>
            <Route path="/introduce" component={Introduce}/>
            <Route path="/input" component={InputLayout}>
                <Route path="/signup" component={SignUp}/>
                <Route path="/sendcomplete" component={SendComplete}/>
                <Route path="/classification" component={Classification}/>
                <Route path="/infoinput" component={InfoInput}/>
                <Route path="/gradeinput" component={GradeInput}/>
                <Route path="/preview" component={Preview}/>
                <Route path="/finalsubmit" component={FinalSubmit}/>
            </Route>
        </Route>
    </Router>, rootElement);