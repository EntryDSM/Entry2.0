import React from 'react';
import Modal from 'react-modal';

class PersonalAgreeModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div className="agree_modal">
                <button className="btn_style" id="btn_findaddress" onClick={this.openModal}>개인정보활용동의문</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="개인정보활용동의서"
                    className="modal_style">

                    <p ref={notice => this.notice = notice}></p>

                    <div id="modal_header">
                        <button id="btn_close" onClick={this.closeModal}>x</button>
                        <h2>개인정보활용동의서</h2>
                    </div>
                    
                </Modal>
            </div>
        );
    }
}

export default PersonalAgreeModal;