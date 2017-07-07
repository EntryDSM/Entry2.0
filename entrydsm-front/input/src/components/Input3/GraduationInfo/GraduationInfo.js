import React, {Component} from 'react';
import styles from './GraduationInfo.css';

class GraduationInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            graduationOptions: [
                {graduateType: "졸업 예정"},
                {graduateType: "졸업"},
                {graduateType: "검정고시"}
            ]
        }
    }

    render(){
        let months = [];
        for(var i=1; i<=12; i++){
            months.push(i);
        }

        return(
            <td>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.td_title}>년</td>
                            <td className={styles.td_content}>
                                <input type="number"/> 
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>월</td>
                            <td className={styles.td_content}>
                                <select>
                                    {months.map((month, index) => {
                                        return <Options optionName={month} key={index} />
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>구분</td>
                            <td className={styles.td_content}>
                                <select>
                                    {this.state.graduationOptions.map((option, index) => {
                                        return <Options optionName={option.graduateType} key={index}/>
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }

    // componentDidMount(){
    //     let gradeInputTables = Array.from(document.querySelectorAll("table > tbody"));
    //     let graduationType = Array.from(document.querySelectorAll('div > select'))[1];
    //     console.log(graduationType);
    //     console.log(gradeInputTables);
    //     graduationType.addEventListener('change', () => {
    //         switch(graduationType.value){
    //             case "졸업": 
    //                 gradeInputTables[1].style.display = "table-row-group";
    //                 gradeInputTables[2].style.display = "none";
    //                 gradeInputTables[3].style.display = "none";
    //                 break;
    //             case "졸업 예정":
    //                 gradeInputTables[1].style.display = "none";
    //                 gradeInputTables[2].style.display = "table-row-group";
    //                 gradeInputTables[3].style.display = "none";
    //                 break;
    //             case "검정고시":
    //                 gradeInputTables[1].style.display = "none";
    //                 gradeInputTables[2].style.display = "none";
    //                 gradeInputTables[3].style.display = "table-row-group";
    //                 break;
    //         }
    //     })
    // }
}

class Options extends Component{
    render(){
        return(
            <option>{this.props.optionName}</option>
        );
    }
}

export default GraduationInfo;