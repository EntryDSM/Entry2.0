import React from 'react';
import '../css/AddressModal.css';
import axios from 'axios';
import Modal from 'react-modal';
import AddressModalTable from './AddressModalTable';
import AddressModalPagenum from './AddressModalPagenum';
import "babel-polyfill";
 
class AddressModal extends React.Component {

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
        this.searchAddress = this.searchAddress.bind(this);
        this.enter = this.enter.bind(this);
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    enter(event) {
        if(event.keyCode === 13) {
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
            url: apiUrl,
            withCredentials: false,
            // headers: {"Access-Control-Allow-Origin": "http://www.juso.go.kr/"}
        }).then(function (response) {
                var result = response.data.results.juso;
                var totalCount = response.data.results.common.totalCount;
                var totalPage = totalCount / countPerPage;
                
                // 주소목록 바인딩
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
                if(startPage !== 1) {
                    datas.push("<");
                }

                var i;
                for(i=startPage; i<=endPage; i++) {
                    datas.push(i);
                }

                if(endPage < totalPage) {
                    datas.push(">");
                }

                that.setState({
                    pageData: datas
                });
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div className="address_div">
                <button className="btn_style" id="btn_findaddress" onClick={this.openModal}>주소찾기</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="주소찾기"
                    className="modal_style">

                    <p ref={notice=> this.notice = notice}></p>
    
                    <div id="modal_header">
                        <button id="btn_close" onClick={this.closeModal}>x</button>
                        <h2>주소찾기</h2>
                    </div>
                    <div id="modal_contents">
                        <input type="text" placeholder="검색어를 입력하세요 (반포대로 58, 독립기념관, 삼성동 25)" id="input_searchaddress" onKeyDown={this.enter}/>
                        <img id="btn_searchaddress" src={require('../images/search.png')} onClick={()=> this.searchAddress(this.Firstpage)}/>

                        <AddressModalTable setAddress={this.props.setAddress} datas={this.state.addressData} closeModal={this.closeModal}/>
                        <AddressModalPagenum datas={this.state.pageData} searchAddr={this.searchAddress} />
                        
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddressModal;