import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import initialState from './initialState';
import 'babel-polyfill';
import { Classification, GradeInput, InfoInput, Introduce, Landing, LoginForm, MainPage, Preview, SendInfo, SignUp, ChangePw, PwSendComplete, FinalSubmit, SignupSendComplete, Mypage, MyPage2, MainPage2, Notice, WriteNotice, ErrorPage } from './containers';
import {createStore} from 'redux';
import reducer from './reducers';
import InputLayout from './components/InputLayout';

import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';

class Provider extends Component{
    getChildContext(){
        return {
            store: this.props.store
        }
    }

    render(){
        return this.props.children;
    }
}
Provider.childContextTypes = {
    store: PropTypes.object
}

const rootElement = document.getElementById('root');
const store = createStore(reducer, initialState);
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/">
                <IndexRoute component={Landing} />
                <Route path="/main" component={MainPage} />
                <Route path="/main2" component={MainPage2}/>
                <Route path="/login" component={LoginForm} />
                <Route path="/changepw" component={ChangePw} />
                <Route path="/sendinfo" component={SendInfo} />
                <Route path="/pwsendcomplete" component={PwSendComplete} />
                <Route path="/SignupSendComplete" component={SignupSendComplete} />
                <Route path="/mypage" component={Mypage}/>
                <Route path="/mypage_1" component={MyPage2}/>
                <Route path="/notice" component={Notice} />
                <Route path="/writenotice" component={WriteNotice} />
                <Route path="/input" component={InputLayout}>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/classification" component={Classification} />
                    <Route path="/infoinput" component={InfoInput} />
                    <Route path="/gradeinput" component={GradeInput} />
                    <Route path="/introduce" component={Introduce} />
                    <Route path="/preview" component={Preview} />
                    <Route path="/finalsubmit" component={FinalSubmit} />
                </Route>
                <Route path="/error" component={ErrorPage}/>
            </Route>
        </Router>
    </Provider>
, rootElement);