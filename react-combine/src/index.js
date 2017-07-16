import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp } from './containers';
import InputLayout from './components/InputLayout';

=======
import SendComplete from './containers/SendComplete';
import ChangePw from './containers/ChangePw';
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp } from './containers';
import InputLayout from './components/InputLayout';


>>>>>>> 032242721e79a358550eb4fdd3730de2ed81e163
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
<<<<<<< HEAD
            <Route path="/sendInfo" component={SendInfo}/>
=======
            <Route path="/sendinfo" component={SendInfo}/>
            <Route path="/sendcomplete" component={SendComplete}/>
            <Route path="/changepw" component={ChangePw}/>
>>>>>>> 032242721e79a358550eb4fdd3730de2ed81e163
            <Route path="/introduce" component={Introduce}/>
            <Route path="/input" component={InputLayout}>
                <Route path="/signup" component={SignUp}/>
                <Route path="/sendcomplete" component={SendComplete}/>
                <Route path="/classification" component={Classification}/>
                <Route path="/infoinput" component={InfoInput}/>
                <Route path="/gradeinput" component={GradeInput}/>
                <Route path="/preview" component={Preview}/>
            </Route>
        </Route>
    </Router>, rootElement);