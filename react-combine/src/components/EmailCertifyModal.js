import React from 'react';
import '../css/Button.css'
import Button from '../components/Button';
import SignupSendComplete from '../containers/SignupSendComplete';
import axios from 'axios';
import Modal from 'react-modal';
import "babel-polyfill";
 
class EmailCertifyModal extends React.Component {

    constructor(props) {
        super(props);
        
        this.Firstpage = 1;
        this.state = {
            modalIsOpen: false,
            addressData: null,
            pageData: null
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    enter(event) {
        if(event.keyCode == 13) {
            this.searchAddress();
        }
    }

    render() {
        return (
            <div id="emailcertify">
                <button id="btn_emailcertify" onClick={this.openModal}>이메일 인증</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="이메일인증"
                    className="modal_style">

                    <SignupSendComplete />
                    <button id="btn_ok" onClick={this.closeModal}>확인</button>
                </Modal>
            </div>
        );
    }
}

export default EmailCertifyModal;