import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/PwChangeBox.css';

class PwChangeBox extends React.Component{
    render(){
        return(
            <div id="PwChangeBox">
                <PwChangeForm h2Title = "비밀번호 변경 페이지"/>
            </div>
        );
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
        }
    }

    changeValues( number,event ) {
        let val = this.state.pwValues;
        val[number] = event.target.value;
        this.setState({
            pwValues: val
        });
        console.log(this.state.pwValues);
    }

    render(){
        return(
            <div id="PwChangeForm">
                <h2> {this.props.h2Title} </h2>

                {this.state.pwArray.map((info, i) => {
                    return (
                        <div key={i}>
                            <h3 id={info.InputForm}> {info.InfoTitle} </h3>

                            <input type={info.InputType} className="PwInput"
                                placeholder={info.InputTitle}
                                value={this.state.pwValues[i]}
                                onChange={this.changeValues.bind(this,i)}
                                 />
                        </div>
                    );
                })}

                <PwSaveButton/>
            </div>
        );
    }
}

const PwSaveButton = () =>{
    return(
        <div id="PwSaveButton">
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