import React from 'react';
import Logo from './Logo';
import Process from './Process';

class Sidebar extends React.Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div className = "menu_area">
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

export default Sidebar;