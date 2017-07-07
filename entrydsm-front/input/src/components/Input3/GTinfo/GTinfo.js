import React, {Component} from 'react';
import styles from './GTinfo.css';

class GTinfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            graduationOptions: [
                {graduateType: "졸업 예정"},
                {graduateType: "졸업"},
                {graduateType: "검정고시"}
            ],
            localOptions: [
                {localType: "전국"},
                {localType: "대전"}
            ],
            typeOptions: [
                {typeName: "일반"},
                {typeName: "특별"},
                {typeName: "국가유공자 자녀"},
                {typeName: "특례입학대상자(고입전형 면제자) 전형"}
            ]
        }
    }

    render(){
        var months = [];

        for(var i=1; i<=12; i++){
            months.push(i);
        }
        return(
            <div className={styles.gtInputDiv}>
                <div className={styles.graduationDiv}>
                    <h2 className={styles.title}>졸업 구분</h2>
                    <div className={styles.inputPart}>
                        <input type="number" style={{width: 50}}/> 년
                        <select className={styles.optionalBtn}>
                            {months.map((month, index) => {
                                return <Options optionName={month} key={index}/>
                            })}
                        </select> 월
                        <select className={styles.optionalBtn}>
                            {this.state.graduationOptions.map((types, index) => {
                                return <Options optionName={types.graduateType} key={index}/>
                            })}
                        </select>
                    </div>
                </div>
                <div className={styles.typeDiv}>
                    <h2 className={styles.title}>전형 구분</h2>
                    <select>
                        {this.state.localOptions.map((localType, index) => {
                            return <Options optionName={localType.localType} key={index}/>
                        })}
                    </select>
                    <select className={styles.optionalBtn}>
                        {this.state.typeOptions.map((typeOptions, index) => {
                            return <Options optionName={typeOptions.typeName} key={index}/>
                        })}
                    </select>
                </div>
            </div>
        );
    }

    componentDidMount(){
        let gradeInputTables = Array.from(document.querySelectorAll("table > tbody"));
        let graduationType = Array.from(document.querySelectorAll('div > select'))[1];
        console.log(graduationType);
        console.log(gradeInputTables);
        graduationType.addEventListener('change', () => {
            switch(graduationType.value){
                case "졸업": 
                    gradeInputTables[1].style.display = "table-row-group";
                    gradeInputTables[2].style.display = "none";
                    gradeInputTables[3].style.display = "none";
                    break;
                case "졸업 예정":
                    gradeInputTables[1].style.display = "none";
                    gradeInputTables[2].style.display = "table-row-group";
                    gradeInputTables[3].style.display = "none";
                    break;
                case "검정고시":
                    gradeInputTables[1].style.display = "none";
                    gradeInputTables[2].style.display = "none";
                    gradeInputTables[3].style.display = "table-row-group";
                    break;
            }
        })
    }
}

class Options extends Component{
    render(){
        return(
            <option>{this.props.optionName}</option>
        );
    }
}

export default GTinfo;