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
        /*this.getschoolInfo = this.getschoolInfo.bind(this);*/
        this.enter = this.enter.bind(this);
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

    searchAddress(pagenum){
        var that = this;
        var currentPage = pagenum;
        var countPerPage = 10;
        var keyword = document.querySelector("#input_searchaddress").value;
        var confmKey = "U01TX0FVVEgyMDE3MDcxMzEwMTY1ODIyODQx";
        var resultType = "json";

        var apiUrl = "http://www.juso.go.kr/addrlink/addrLinkApi.do?"  +
        "currentPage="+currentPage +
        "&countPerPage="+countPerPage +
        "&keyword="+keyword +
        "&confmKey="+confmKey +
        "&resultType="+resultType;

        axios({
            method: "get",
            url: 'http://114.108.135.15:8080/user/inquiry/',
            withCredentials: 'false',
            params: {
                schoolName: document.getElementById("input_searchschool").value
            },
        })
        .then(function(response){
                var result = response.data.results.juso;
                var totalCount = response.data.results.common.totalCount;
                var totalPage = totalCount / countPerPage;
                
                // 주소목록 바인딩
                var array = new Array();
                var datas = [];
                result.forEach(function(element) {
                    datas.push(
                        {
                            roadAddr:element.roadAddr,
                            zipNo:element.zipNo
                        });
                }, this);

                that.setState({
                    addressData: datas
                });

                // // 페이지 목록
                var startPage =(parseInt((currentPage+4)/5) - 1) * 5 + 1;
                var endPage;
                if((startPage+4) > totalPage){
                    endPage = totalPage;
                } else {
                    endPage = startPage + 4;
                }
                
                datas = [];
                if(startPage != 1) {
                    datas.push("<");
                }

                var i;
                for(i=startPage; i<=endPage; i++) {
                    datas.push(i);
                }
                console.log('datas',datas);

                if(endPage < totalPage) {
                    datas.push(">");
                }
                console.log('datas',datas);

                that.setState({
                    pageData: datas
                });
                
            })
        .catch(function(error){
            console.log(error);
        })
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
                        <EduOptions educations = {
                            [
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
                        }/>
                        <input type="text" placeholder="학교명을 입력해주세요." id="input_searchschool" onKeyDown={this.enter}/>
                        <img id="btn_searchschool" onClick={() => this.searchAddress(this.Firstpage)} src={require('../images/search.png')}/>
                        
                        <FindSchoolModalTable />
                    </div>
                </Modal>
            </div>
        );
    }
}

const EduOptions = (props) => {
    return(
        <select>
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