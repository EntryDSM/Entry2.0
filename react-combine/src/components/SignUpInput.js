import React, {Component} from 'react';
import '../css/SignUp.css';

class SignUpInput extends Component{
    render(){
        return(
            <tbody>
                {this.props.inputs.map((input, index) => {
                    if(index === 1){
                        return  <tr key={index}>
                                    <td className="td_title">{input.name}</td>
                                    <td className="td_content">
                                        <input type={input.type} className={input.className}/>
                                        <select className="emailSelect">
                                            {this.props.emails.map((email, index) => {
                                                return <Options name={email.name} key={index} />
                                            })}
                                        </select>
                                    </td>
                                </tr>
                    } else {
                        return  <tr key={index}>
                            <td className="td_title">{input.name}</td>
                            <td className="td_content">
                                <input type={input.type} className={input.className}/>
                            </td>
                        </tr>
                    }
                })}
            </tbody>
        );
    }
}

SignUpInput.defaultProps = {
    emails: [
        {name: "gmail.com"},
        {name: "naver.com"},
        {name: "hanmail.net"},
        {name: "hotmail.com"},
        {name: "hanmir.com"},
        {name: "nate.com"},
        {name: "empar.com"},
        {name: "korea.com"}
    ]
}

const Options = (props) => {
    return (
        <option>{this.props.name}</option>
    );
}

export default SignUpInput;