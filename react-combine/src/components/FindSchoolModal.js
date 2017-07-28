import React from 'react';
import '../css/FindSchoolModal.css';
import FindSchoolModalTable from './FindSchoolModalTable';
import Modal from 'react-modal';
import axios from 'axios';
// import FindSchoolModalTable from './FindSchoolModalTable';
// import FindSchoolModalPagenum from './FindSchoolModalPagenum';
 
class FindSchoolModal extends React.Component {

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
        this.getschoolInfo = this.getschoolInfo.bind(this);
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div className="findschool_div">
                <button className="btn_style" id="btn_findschool" onClick={this.openModal}>학교찾기</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="학교찾기"
                    className="modal_style">

                    <p ref={notice=> this.notice = notice}></p>
    
                    <div id="modal_header">
                        <button id="btn_close" onClick={this.closeModal}>x</button>
                        <h2>학교찾기</h2>
                    </div>
                    <div id="modal_contents">
                        <input type="text" placeholder="학교명을 입력해주세요." id="input_searchschool"/>
                        <img id="btn_searchschool" onClick={this.getschoolInfo} src={require('../images/search.png')}/>
                        
                        <FindSchoolModalTable />
                    </div>
                </Modal>
            </div>
        );
    }

    getschoolInfo() {
        axios({
            method: "get",
            url: 'http://114.108.135.15:8080/user/inquiry/',
            withCredentials: 'false',
            params: {
                schoolName: document.getElementById("input_searchschool").value
            },
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

export default FindSchoolModal;