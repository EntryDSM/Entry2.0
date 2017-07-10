import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import Header from '../Header';
import Section from '../Section';
import Footer from '../Footer';


class App extends React.Component{
    componentWillMount(){
        document.body.style.width = "100%";
        document.body.style.height = "auto";
        document.body.style.margin = "0 auto";
        document.body.style.minWidth = "850px";
        document.body.style.position = "relative";
    }
   render(){
       return(
            <div>
                <Header/>
                <Section/>
                <Footer/>
            </div>  
       );
   }

}

export default App;
