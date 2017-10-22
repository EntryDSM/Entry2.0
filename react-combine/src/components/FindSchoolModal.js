import React from 'react';
import '../css/FindSchoolModal.css';
import FindSchoolModalTable from './FindSchoolModalTable';
import Modal from 'react-modal';
 
class FindSchoolModal extends React.Component {
    render() {
        return (
            <div className="findschool_div">
                <button className="btn_style" id="btn_findschool" onClick={this.props.openModal}>학교찾기</button>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    contentLabel="학교찾기"
                    className="modal_style">

                    <p ref={notice=> this.notice = notice}></p>
    
                    <div id="modal_header">
                        <button id="btn_close" onClick={this.props.closeModal}>x</button>
                        <h2>학교찾기</h2>
                    </div>
                    <div id="modal_contents">
                        <EduOptions educations = {
                            [
                                {"eduName" : "전체"},
                                {"eduName" : "서울특별시교육청"},
                                {"eduName" : "부산광역시교육청"},
                                {"eduName" : "대구광역시교육청"},
                                {"eduName" : "인천광역시교육청"},
                                {"eduName" : "광주광역시교육청"},
                                {"eduName" : "대전광역시교육청"},
                                {"eduName" : "울산광역시교육청"},
                                {"eduName" : "경기도교육청"},
                                {"eduName" : "강원도교육청"},
                                {"eduName" : "충청북도교육청"},
                                {"eduName" : "충청남도교육청"},
                                {"eduName" : "전라북도교육청"},
                                {"eduName" : "전라남도교육청"},
                                {"eduName" : "경상북도교육청"},
                                {"eduName" : "경상남도교육청"},
                                {"eduName" : "제주도교육청"},
                                {"eduName" : "제주특별자치도교육청"},
                                {"eduName" : "세종특별자치시교육청"}
                            ]
                        }
                        getSchoolCode={this.props.getSchoolCode}/>
                        <input type="text" placeholder="학교명을 입력해주세요." id="input_searchschool" onChange={this.props.getSchoolCode} onKeyDown={this.enter}/>
                        <img id="btn_searchschool" onClick={this.props.getSchoolCode} src={require('../images/search.png')}/>
                        
                        <FindSchoolModalTable 
                            schoolList={this.props.schoolList}
                            setSchoolInfo={this.props.setSchoolInfo}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

const EduOptions = (props) => {
    return(
        <select id="select_government" onChange={props.getSchoolCode}>
            {props.educations.map((vals, idx) => {
                return(
                    <option value = {vals.eduName} key = {idx}>
                        {vals.eduName}
                    </option>
                );
            })}                   
        </select>
    );
}

export default FindSchoolModal;