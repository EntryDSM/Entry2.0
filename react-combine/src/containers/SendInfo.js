import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import SendInfoBox from '../components/SendInfoBox';
import 'babel-polyfill';
import '../css/SendInfo.css';
import '../css/FormIndex.css';

class SendInfo extends React.Component{
    render(){
        return(
            <div id="send-info">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "confirm"/>
                <SendInfoBox/>
            </div>
        );
    }
}

export default SendInfo;