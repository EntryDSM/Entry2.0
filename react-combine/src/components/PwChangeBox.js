import React from 'react';
import axios from 'axios';

class PwChangeBox extends React.Component{
    render(){
        return(
            <div id="PwChangeBox">
                <PwChangeForm h2Title = "비밀번호 변경 페이지"/>
            </div>
        );
    }

    componentDidMount(){
        var firstPw = document.getElementById('PwCheck1');
        var secondPw = document.getElementById('PwCheck2');
        var clickBtn = document.getElementById('PwSaveButton');

        console.log("IE/Edge 출력 되나연?");

        secondPw.addEventListener('keyup', () => {
            if(firstPw.value !== "" && secondPw.value !== ""){

                if(firstPw.value === secondPw.value){
                    secondPw.style.border = "2px solid rgb(56, 205, 177)";
                }else{
                    secondPw.style.border = "2px solid red";
                }
            }
        });

        clickBtn.addEventListener('click', () => {
            if (firstPw.value === "" || secondPw.value === "") {
                alert("비밀번호를 입력해주세요!");
            }

            else if (firstPw.value === secondPw.value) {
                alert("저장되었습니다!");
                //bdy.style.backgroundColor = "rgb(56, 205, 177)";d
                let ChangedValue = firstPw.value;

                console.log("저장된 비밀번호: " + ChangedValue);
            }

            else {
                alert("비밀번호를 확인해주세요!");
                secondPw.value = "";
                secondPw.style.border = 0;
            }
        });
    }
}

class PwChangeForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            pwArray: [
                {
                    InfoTitle: "새로운 비밀번호를 입력해주세요.",
                    InputTitle: "비밀번호 입력",
                    Type: "password",
                    IdName: "PwCheck1"
                },
                {
                    InfoTitle: "다시 한번 입력해주세요.",
                    InputTitle: "비밀번호 입력",
                    Type: "password",
                    IdName: "PwCheck2",
                    InputForm: "FormLocation"
                }
            ],

            pwValues: [

            ]
        };
        this.Authentication2 = this.Authentication2.bind(this);
    }

    Authentication2(){
        axios({
            method: "PUT",
            url: "http://localhost:8080/account/password/change",
            data: {
                password: this.state.pwArray[0]
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080"
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log(err);
        });
    }

    changeValues( number,event ) {
        let val = this.state.pwValues;
        val[number] = event.target.value;
        this.setState({
            pwValues: val
        });
    }

    render(){
        return(
            <div id="PwChangeForm">
                <h2> {this.props.h2Title} </h2>

                {this.state.pwArray.map((info, i) => {
                    return (
                        <div key={i}>
                            <h3 id={info.InputForm}> {info.InfoTitle} </h3>

                            <input type={info.Type} className="PwInput"
                                placeholder={info.InputTitle}
                                value={this.state.pwValues[i]}
                                onChange={this.changeValues.bind(this,i)}
                                id={info.IdName}
                                autoComplete = "off"
                                 />
                        </div>
                    );
                })}

                <PwSaveButton onClick={this.Authentication2}/>
            </div>
        );
    }
}

const PwSaveButton = (props) =>{
    return(
        <div id="PwSaveButton" onClick={props.onClick}>
            <PwSaveText text = "비밀번호 저장"/>
        </div>
    );
}

const PwSaveText = (props) =>{
    return(
        <div id="PwSaveText">
            {props.text}
        </div>
    );
}

export default PwChangeBox;