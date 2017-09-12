import React from 'react';
import '../css/EmailCertifyModal.css';
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
                isOpen={this.props.modalIsOpen}
                onRequestClose={this.props.closeModal}
                contentLabel="이메일인증"
                className="modal_style">

                <SignupSendComplete 
                    getCertifyCode={this.props.getCertifyCode}/>
                <button id="btn_ok" onClick={this.props.verifyCode}>확인</button>
            </Modal>
        );
    }
}

export default EmailCertifyModal;