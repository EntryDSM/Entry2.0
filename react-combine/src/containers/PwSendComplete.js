import React from 'react';
import PwCompleteCheckedBox from '../components/PwCompleteCheckedBox';
import '../css/FormIndex.css';
import '../css/CompleteCheckedBox.css';

class PwSendComplete extends React.Component{
    render(){
        return(
            <div id="pw-complete-box">
                <PwCompleteCheckedBox/>
            </div>
        );
    }
}

export default PwSendComplete;