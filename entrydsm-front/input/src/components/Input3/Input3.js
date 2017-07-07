import React, {Component} from 'react';
import InputHeader from '../InputHeader/InputHeader';
import styles from './Input3.css';
import GradeInput from './GradeInput/GradeInput';
import Volunteer from './Volunteer/Volunteer';
import Attend from './Attend/Attend';
import GraduationInfo from './GraduationInfo/GraduationInfo';
import TypeInfo from './TypeInfo/TypeInfo';
import InputLayout from '../InputLayout/InputLayout';

class Input3 extends Component{
    componentWillMount(){
        document.body.style.margin = 0;
        document.body.style.padding = 0;
    }

    render(){
        return(
            <div id={styles.contents}>
                <div className={styles.inputTitle}>
                    <InputHeader now={"성적 입력"} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>졸업구분</td>
                            <td>전형구분</td>
                            <td>봉사시간</td>
                            <td>출석성적</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <GraduationInfo />
                            <TypeInfo />
                            <Volunteer />
                            <Attend />
                        </tr>
                    </tbody>
                </table>
                <GradeInput />
            </div>
        );
    }

    componentDidMount(){
        var buttons = document.querySelectorAll('table > tbody > tr > td > div');
        Array.from(buttons).forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if(btn.children.length === 0){
                    Array.from(btn.parentElement.children).forEach((children) => {
                        children.style.background = "none";
                    });
                    btn.style.background = '#87CEEB';   
                }
            });
        })
    }
}

export default Input3;