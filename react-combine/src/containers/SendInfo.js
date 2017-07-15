import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/FormIndex.css';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import SendInfoBox from '../components/SendInfoBox';

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