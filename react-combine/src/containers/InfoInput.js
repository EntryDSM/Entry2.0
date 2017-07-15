import React from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from '../components/NavigationBar'
import EntryView from '../components/EntryView'
import SchoolIntro from '../components/SchoolIntro'
import Footer from '../components/MainFooter'
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import '../css/InfoInput.css'

class InfoInput extends React.Component {
    
    render(){
        return(
            <div id={styles.contents}>
                <div className={styles.inputTitle}>
                    <InputHeader now={"인적 사항"} />
                </div>
                <InfoInputTable />
            </div>
        );
    }
}

export default InfoInput;