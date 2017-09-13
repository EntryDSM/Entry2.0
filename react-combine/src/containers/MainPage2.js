import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import MainSection from '../components/MainSection';
import '../css/MainPage2.css';
// import MainFooter from '../components/MainFooter';

class MainPage2 extends Component{
    render(){
        return(
            <div id = "main2">
                <MainHeader ImgUrl = {require('../images/DSM Logo.png')}/>
                <MainSection/>
            </div>
        );
    }
}

export default MainPage2;