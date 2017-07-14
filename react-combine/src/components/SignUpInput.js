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
                                        {/*<select className="emailSelect">
                                            {this.state.emails.map((email, index) => {
                                                return <Options name={email.name} key={index} />
                                            })}
                                        </select>*/}
                                    </td>
                                </tr>
                    }
                    return  <tr key={index}>
                                <td className="td_title">{input.name}</td>
                                <td className="td_content">
                                    <input type={input.type} className={input.className}/>
                                </td>
                            </tr>
                })}
            </tbody>
        );
    }
}

export default SignUpInput;