import React, {Component} from 'react';
import styles from './Address.css';
import axios from 'axios';
import Modal from 'react-modal';
import AddressTable from './AddressTable/AddressTable';
import PageNumber from './PageNumber/PageNumber';
 
class Address extends Component {

    constructor() {
        super();
        
        this.Firstpage = 1;
        this.state = {
            modalIsOpen: false,
            addressData: null,
            pageData: null
        };
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.searchAddress = this.searchAddress.bind(this);
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    searchAddress(pagenum){
        var that = this;
        var currentPage = pagenum;
        var countPerPage = 10;
        var keyword = document.querySelector("#input_searchaddress").value;
        console.log('pagenum',pagenum);
        var confmKey = "U01TX0FVVEgyMDE3MDcxMzEwMTY1ODIyODQx";
        var resultType = "json";

        var apiUrl = "http://www.juso.go.kr/addrlink/addrLinkApi.do?"  +
        "currentPage="+currentPage +
        "&countPerPage="+countPerPage +
        "&keyword="+keyword +
        "&confmKey="+confmKey +
        "&resultType="+resultType;

        axios.get(apiUrl)
            .then(function (response) {
                console.log(response);
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
            .catch(function (error) {
                console.log(error);
            });
    }

     render() {
        return (
            <div className={styles.address_div}>
                <button className={styles.btn_style} id={styles.btn_findaddress} onClick={this.openModal}>주소찾기</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    onAfterOpen={this.afterOpenModal}
                    contentLabel="주소찾기"
                    className={styles.modal_style}>
    
                    <div id={styles.modal_header}>
                        <button id={styles.btn_close} onClick={this.closeModal}>x</button>
                        <h2>주소찾기</h2>
                    </div>
                    <div id={styles.modal_contents}>
                        <input type="text" placeholder="검색어를 입력하세요 (반포대로 58, 독립기념관, 삼성동 25)" id={styles.input_searchaddress}/>
                        <img id={styles.btn_searchaddress} src={require('../search.png')} onClick={()=> this.searchAddress(this.Firstpage)}/>
                        
                        <AddressTable datas={this.state.addressData}/>
                        <PageNumber datas={this.state.pageData} searchAddr={this.searchAddress} />
                        
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Address;