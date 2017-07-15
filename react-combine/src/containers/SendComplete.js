import React from 'react';
import ReactDOM from 'react-dom';
import CompleteCheckedBox from '../components/CompleteCheckedBox';
import styles from '../css/FormIndex.css';

class SendComplete extends React.Component{
    render(){
        return(
            <div id="complete-box">
                <CompleteCheckedBox/>
            </div>
        );
    }
}

export default SendComplete;