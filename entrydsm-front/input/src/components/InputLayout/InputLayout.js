import React from 'react';
import styles from './InputLayout.css';
import Logo from './Logo/Logo';
import Process from './Process/Process';
import Footer from '../Footer/Footer';
import Input3 from '../Input3/Input3'

class InputLayout extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div className = {styles.menu_area}>
                <Logo />
                <Process />
            </div>
        );
    }

    componentDidMount() {
        var content = document.querySelector("#contents");
        var menu = document.querySelector(".menu_area");
        menu.style.height = content.clientHeight;
    }
}

InputLayout.defaultProps = {
    headerTitle: "명치 입력"
};

export default InputLayout;