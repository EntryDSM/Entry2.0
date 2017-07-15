import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import Landing from './containers/Landing';
import MainPage from './containers/MainPage';
import LoginForm from './containers/LoginForm';
import SendInfo from './containers/SendInfo';
import SendComplete from './containers/SendComplete';
import ChangePw from './containers/ChangePw';
=======
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp } from './containers';
import InputLayout from './components/InputLayout';
>>>>>>> fc5856f153f7475c2affc58e8bde41a9ead3c635

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
            <Route path="/sendInfo" component={SendInfo}/>
<<<<<<< HEAD
            <Route path="/sendComplete" component={SendComplete}/>
            <Route path="/changePw" component={ChangePw}/>
=======
            <Route path="/input" component={InputLayout}>
                <Route path="/signup" component={SignUp}/>
                <Route path="/Classification" component={Classification}/>
                <Route path="/InfoInput" component={InfoInput}/>
                <Route path="/GradeInput" component={GradeInput}/>
                <Route path="/Preview" component={Preview}/>
            </Route>
>>>>>>> fc5856f153f7475c2affc58e8bde41a9ead3c635
        </Route>
    </Router>, rootElement);