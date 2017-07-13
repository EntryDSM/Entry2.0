import React, {Component} from 'react';
import styles from './Address.css';
import axios from 'axios';
import Modal from 'react-modal';
 
class Address extends Component {

    constructor() {
        super();
    
        this.state = {
        modalIsOpen: false
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
        console.log("pagenum: " + pagenum);
        var currentPage = pagenum;
        var countPerPage = 10;
        var keyword = document.querySelector("#input_searchaddress").value;
        console.log(keyword);
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
                document.querySelector("#addrResult").innerHTML = "<th class=\"th_addr\">" + "도로명 주소" + "</th>" + "<th class=\"th_addr\">" + "우편번호" + "</th>";
                result.forEach(function(element) {
                    var component = "<tr>" + "<td class=\"road_address\">" + element.roadAddr + "</td>" + "<td class=\"zipNo\">" + element.zipNo + "</td>" + "</tr>";
                    document.querySelector("#addrResult").innerHTML += component;
                }, this);

                // 페이지 목록
                var startPage = parseInt((currentPage+5)/5);
                var endPage;
                if((startPage+4) > totalPage){
                    endPage = totalPage;
                } else {
                    endPage = startPage + 4;
                }
                var modalpage = document.getElementById("modalPage")
                modalpage.innerHTML = "";
                if(startPage != 1) {
                    var pagenum = "<a href=\"#\" class=\"btn_modalnext\">" + "<" + "</a>";
                    modalpage.innerHTML += pagenum;
                }

                console.log(startPage);
                console.log(endPage);
                var i;
                for(i=startPage; i<=endPage; i++) {
                    console.log("test : " + i);
                    var pagenum = "<a href=\"#\" class=\"btn_modalnext\">" + i + "</a>";
                    modalpage.innerHTML += pagenum;
                }

                if(endPage < totalPage) {
                    var pagenum = "<a href=\"#\" class=\"btn_modalnext\">" + ">" + "</a>";
                    modalpage.innerHTML += pagenum;
                }

                // a tag event
                document.querySelectorAll(".btn_modalnext").forEach(function(element) {
                    element.addEventListener("click", function(event){
                        var pageNo = parseInt(element.innerHTML);
                        this.searchAddress(pageNo);
                    })
                })
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
                        <img id={styles.btn_searchaddress} src={require('../search.png')} onClick={()=> this.searchAddress(1)}/>
                        <table id={styles.table_addr}>
                            <tbody id="addrResult">
                            </tbody>
                        </table>
                        <div id="modalPage"></div>
                        <a onClick={()=> this.searchAddress(2)}>X</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Address;