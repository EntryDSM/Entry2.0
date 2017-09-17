import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import WriteNoticeBox from '../components/WriteNoticeBox';

class LoginForm extends React.Component{
    render(){
        return(
            <div id="login-form">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "게시물 작성"/>
                <WriteNoticeBox />
            </div>
        );  
    }
}

export default LoginForm;