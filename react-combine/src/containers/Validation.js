import React, {Component} from 'react';
import MainHeader from '../components/MainHeader';
import axios from 'axios';
import '../css/Validation.css';

class Validation extends Component{
    constructor(props){
        super(props);
        this.state = {
            validationResult: []
        }
    }

    componentDidMount(){
        axios({
            method: 'GET',
            url: '/api/validation'
        }).then(response => {
            console.log(response);
            let validation = new Array;
            this.setState({
                validationResult: response.data.grade
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render(){
        let result = new Array;
        result.forEach((ele) => {
            result.push(<ValidationResult result={ele} />);
        })
        return (
            <div id="validation">
                <MainHeader ImgUrl = {require('../images/DSM Logo.png')} />
                {result}
            </div>
        );
    }
}

const ValidationResult = (props) => {
    console.log(props);
    return(
        <p>{props.result}</p>
    );
}

export default Validation;