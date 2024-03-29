import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import PwChangeBox from '../components/PwChangeBox';
import 'babel-polyfill';
import '../css/FormIndex.css';

class ChangePw extends React.Component{
    render(){
        return(
            <div id="pw-change">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "pw-change"/>
                <PwChangeBox/>
            </div>
        );
    }
}

export default ChangePw;