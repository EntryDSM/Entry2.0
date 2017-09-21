import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import {browserHistory} from 'react-router';
import '../css/InputLayout.css';

class InputLayout extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    moveClassification(){
        browserHistory.push('classification');
    }

    moveInfoinput(){
        browserHistory.push('infoinput');
    }

    moveGradeinput(){
        browserHistory.push('gradeinput');
    }

    moveIntroduce(){
        browserHistory.push('introduce');
    }

    render(){
        return(
            <div id="wrapper">
                <div id="innerWrapper">
                    <Sidebar 
                        moveClassification={this.moveClassification.bind(this)}
                        moveInfoinput={this.moveInfoinput.bind(this)}
                        moveGradeinput={this.moveGradeinput.bind(this)}
                        moveIntroduce={this.moveIntroduce.bind(this)}/>
                    {this.props.children}
                </div>
                <Footer/>
            </div>

        );
    }
}

export default InputLayout;