import React from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';

class InfoInput extends React.Component {
    
    render(){
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable />
                    <Button router="/classification" buttonName="이전"/>
                    <Button router="/gradeinput" buttonName="다음"/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        
    }
}

export default InfoInput;