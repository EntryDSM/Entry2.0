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
    }
 
    openModal() {
        this.setState({modalIsOpen: true});
    }
 
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    searchAddress(){
        var currentPage = 1;
        var countPerPage = 10;
        var keyword = "광주광역시 광산구";
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
                var result = response.data.results.juso;
                var array = new Array();
                result.forEach(function(element) {
                    console.log(element.roadAddr);
                    var component = "<tr>" +
                        "<td>" + element.roadAddr + "</td>" +
                    "</tr>";

                    document.querySelector("#addrResult").innerHTML += component;

                }, this);
            })
            .catch(function (error) {
                console.log(error);
            });
           // $("#list").html(htmlStr);
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
                        <img id={styles.btn_searchaddress} src={require('../search.png')} onClick={this.searchAddress}/>
                        <table>
                            <tbody id="addrResult">
                                
                            </tbody>
                        </table>
                        <div id="td"></div>
                        <a href="" className={styles.modal_page}>1</a>

                    </div>
                </Modal>
            </div>
        );
    }
}

export default Address;