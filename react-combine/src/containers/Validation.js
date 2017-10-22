import React, {Component} from 'react';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import {browserHistory} from 'react-router';
import 'babel-polyfill';
import '../css/Validation.css';

class Validation extends Component{
    constructor(props){
        super(props);
        this.state = {
            validationResult: []
        }
    }

    componentWillMount(){
        axios({
            method: 'GET',
            url: '/api/validation'
        }).then(response => {
            console.log(response);
            let validation = new Array;
            response.data.classification.forEach((ele) => {
                validation.push(ele + "(구분선택)");
            })
            response.data.info.forEach((ele) => {
                validation.push(ele + "(인적사항)");
            })
            response.data.grade.forEach((ele) => {
                validation.push(ele + "(성적입력)");
            })
            response.data.introduce.forEach((ele) => {
                validation.push(ele + "(자기소개서 & 학업계획서)");
            })
            console.log(validation);
            this.setState({
                validationResult: validation
            })
        }).catch(error => {
            console.log(error);
            console.log('go to error~');
            browserHistory.push('/error');
        })
    }

    check(e){
        browserHistory.push(e.target.classList.value);
    }

    render(){
        return (
            <div id="validation">
                <MainHeader ImgUrl = {require('../images/DSM Logo.png')} />
                {this.state.validationResult.map((ele) => {
                    return <ValidationResult result={ele} check={this.check.bind(this)}/>
                })}
            </div>
        );
    }
}

const ValidationResult = (props) => {
    let page;
    if(props.result.includes("구분선택")){
        page="classification";
    } else if(props.result.includes("인적사항")){
        page="infoinput";
    } else if(props.result.includes("성적입력")){
        page="gradeinput";
    } else if(props.result.includes("자기소개서 & 학업계획서")){
        page="introduce";
    }
    return(
        <div className="validationResult">            
            <p className={page} onClick={props.check}>{props.result}</p>
        </div>
    );
}

export default Validation;