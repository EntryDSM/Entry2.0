import React from 'react';
import CompleteCheckedBox from '../components/CompleteCheckedBox';
import '../css/FormIndex.css';
import '../css/CompleteCheckedBox.css';

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