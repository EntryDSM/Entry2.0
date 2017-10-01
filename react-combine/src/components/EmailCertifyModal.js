import React from 'react';
import '../css/Button.css'
import Button from '../components/Button';
import SignupSendComplete from '../containers/SignupSendComplete';
import axios from 'axios';
import Modal from 'react-modal';
import "babel-polyfill";
 
class EmailCertifyModal extends React.Component {
    enter(event) {
        if(event.keyCode == 13) {
            this.searchAddress();
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.emailModalIsOpen}
                contentLabel="이메일인증"
                className="email_modal_style">
                <div id="emailcertify">
                    <SignupSendComplete 
                        getCertifyCode={this.props.getCertifyCode}/>
                    <button id="btn_ok" onClick={this.props.verifyCode}>확인</button>
                </div>
            </Modal>
        );
    }
}

export default EmailCertifyModal;