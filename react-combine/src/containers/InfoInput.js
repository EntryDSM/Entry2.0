import React from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import '../css/InfoInput.css'

class InfoInput extends React.Component {
    
    render(){
        return(
            <div id="contents">
                <div className="inputTitle">
                    <InputHeader now={"인적 사항"} />
                </div>
                <InfoInputTable />
            </div>
        );
    }
}

export default InfoInput;