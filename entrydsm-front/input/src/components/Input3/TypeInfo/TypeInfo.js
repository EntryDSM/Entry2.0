import React, {Component} from 'react';
import styles from './TypeInfo.css';

class TypeInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
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
        return(
            <td>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.td_title}>지역</td>
                            <td className={styles.td_content}>
                                <select>
                                    {this.state.localOptions.map((local, index) => {
                                        return <Options optionName={local.localType} key={index}/>
                                    })}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>구분</td>
                            <td className={styles.td_content}>
                                <select>
                                    {this.state.typeOptions.map((type, index) => {
                                        return <Options optionName={type.typeName} key={index} />
                                    })}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        );
    }
}

class Options extends Component{
    render(){
        return(
            <option>{this.props.optionName}</option>
        );
    }
}

export default TypeInfo;