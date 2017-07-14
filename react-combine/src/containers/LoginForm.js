import React from 'react';
import ReactDOM from 'react-dom';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import LoginBox from '../components/LoginBox';
import LoginSubBox from '../components/LoginSubBox';
import styles from '../css/FormIndex.css';

class LoginForm extends React.Component{
    render(){
        return(
            <div id="login-form">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "Sign-In Page"/>
                <LoginBox />
                <LoginSubBox hTitle = "아직 원서접수를 안하셨나요?"
                             aTitle = "원서접수 하러 가기"/>
            </div>
        );  
    }
}

export default LoginForm;