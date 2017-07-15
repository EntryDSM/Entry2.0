import React from 'react';
import styles from './InputLayout.css';
import Footer from '../Footer/Footer';
import Sidebar from './Siderbar/Sidebar'

class InputLayout extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div id="wrapper">
                <Sidebar/>
                {this.props.children}
                <Footer/>
            </div>

        );
    }

    componentDidMount() {
        var content = document.querySelector("#contents");
        var menu = document.querySelector(".menu_area");
        menu.style.height = content.clientHeight;
    }
}

export default InputLayout;