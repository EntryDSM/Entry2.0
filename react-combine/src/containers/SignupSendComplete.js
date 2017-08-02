import React from 'react';
import SignupCompleteChecked from '../components/SignupCompleteChecked';
import '../css/FormIndex.css';
import '../css/CompleteCheckedBox.css';

class SignupSendComplete extends React.Component{
    render(){
        return(
            <div id="signup-complete-box">
                <SignupCompleteChecked/>
            </div>
        );
    }
}

export default SignupSendComplete;