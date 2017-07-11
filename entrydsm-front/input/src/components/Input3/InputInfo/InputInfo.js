import React, {Component} from 'react';
import styles from './InputInfo.css';
import UploadImage from '../UploadImage/UploadImage'

class InputInfo extends Component {
    render() {
        return(
            <div id={styles.divFirst}>
                <table id={styles.table}>
                    <tbody>
                        <tr id={styles.tr_name}>
                            <td className={styles.td_title}>성명</td>
                            <td className={styles.td_content}><input type="text" className={styles.input_style}/></td>
                            <td className={styles.td_space} rowSpan="6"><UploadImage /></td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>성별</td>
                            <td className={styles.td_content}>
                                <input type="radio" name="sex" className={styles.input_style}/>남
                                <input type="radio" name="sex" className={styles.input_style}/>여
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>생년월일</td>
                            <td className={styles.td_content}>
                                <input type="text" className={styles.input_style} id={styles.year}/>년 
                                <input type="text" className={styles.input_style} id={styles.month}/>월 
                                <input type="text" className={styles.input_style} id={styles.day}/>일 
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>학반</td>
                            <td className={styles.td_content}>
                                <select className={styles.input_style}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>학년
                                <input type="text" className={styles.input_style} id={styles.class}/>반 
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>중학교명</td>
                            <td className={styles.td_content}>
                                <input type="text" className={styles.input_style} id={styles.school_name}/>
                                <button className={styles.btn_style} id={styles.btn_findschool}>학교찾기</button>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>본인연락처</td>
                            <td className={styles.td_content}>
                                <input type="text" className={styles.input_style}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>부모연락처</td>
                            <td className={styles.td_content}>
                                <input type="text" className={styles.input_style}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>학교연락처</td>
                            <td className={styles.td_content} colSpan="2">
                                <input type="text" className={styles.input_style}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.td_title}>이메일</td>
                            <td className={styles.td_content} colSpan="2">
                                <input type="text" className={styles.input_style}/>@<input type="text" className={styles.input_style}/>
                            </td>
                        </tr>
                        <tr id={styles.tr_address}>
                            <td className={styles.td_title}>주소</td>
                            <td className={styles.td_content} colSpan="2">
                                <input type="text" className={styles.input_style} id={styles.base_address}/>
                                <button className={styles.btn_style} id={styles.btn_findschool}>주소찾기</button>
                                <input type="text" className={styles.input_style} id={styles.detail_address}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id={styles.nextBtn} type="button">성적 입력</button>
            </div>
        );
    }
}

export default InputInfo;