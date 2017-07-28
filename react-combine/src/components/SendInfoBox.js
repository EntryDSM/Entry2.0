import React from 'react';
import axios from 'axios';

class SendInfoBox extends React.Component{
    render(){
        return(
            <div id="SendBox">
                <SendForm hTitle = "개인정보를 입력해주세요."/>
            </div>
        );
    }
}

class SendForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            sendArray: [
                {
                    InfoTitle: "이름(Name)",
                    InputTitle: "이름을 입력해주세요.",
                    Type: "text"
                },
                {
                    InfoTitle: "이메일(Email)",
                    InputTitle: "이메일을 입력해주세요.",
                    Type: "email",
                    IdName: "emailInput"
                }
            ],

            formsValues: [

            ]
        };
        this.Authentication3 = this.Authentication3.bind(this);
    }

    Authentication3(){
        axios({
            method: "POST",
            url: "http://localhost:8080/account/password/demand",
            data: {
                email: this.state.sendArray[1]
            },
            withCredentials: false,
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:8080"
            }
        }).then(function(response){
            console.log(response);
        }).catch(function(err){
            console.log(err);
        });
    }

    changeValues( number,event ) {
        let val = this.state.formsValues;
        val[number] = event.target.value;
        this.setState({
            formsValues: val
        });
        console.log(this.state.formsValues);
    }

    render(){
        return(
            <div id="SendForm">
                <h2> {this.props.hTitle} </h2>

                {this.state.sendArray.map((info, i) => {
                    return (
                        <div key={i}>
                            <h3 id={info.IdName}> {info.InfoTitle} </h3>

                            <input type={info.InputType} className="MainInput"
                                placeholder={info.InputTitle}
                                value={this.state.formsValues[i]}
                                onChange={this.changeValues.bind(this,i)}
                                 />
                        </div>
                    );
                })}
                <SendButton onClick={this.Authentication3}/>
            </div>
        );
    }
}

const SendButton = (props) =>{
    return(
        <div id="SendButton" onClick={props.onClick}>
            <SendText text = "인증 링크 발송"/>
        </div>
    );
}

const SendText = (props) =>{
    return(
        <div id="SendText">
            {props.text}
        </div>
    );
}

export default SendInfoBox;