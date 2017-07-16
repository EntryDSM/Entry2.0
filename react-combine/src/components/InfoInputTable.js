import React from 'react';
import AddressModal from './AddressModal';
import UploadImage from './UploadImage';
import Button from './Button';
import '../css/InfoInputTable.css';

class InfoInputTable extends React.Component {
    render() {
        return(
            <div id="info_input">
                <table id="table">
                    <tbody>
                        <tr id="tr_name">
                            <td className="td_title">성명</td>
                            <td className="td_content"><input type="text" className="input_style"/></td>
                            <td className="td_space" rowSpan="6"><UploadImage /></td>
                        </tr>
                        <tr>
                            <td className="td_title">성별</td>
                            <td className="td_content">
                                <input type="radio" name="sex" className="input_style"/>남
                                <input type="radio" name="sex" className="input_style"/>여
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">생년월일</td>
                            <td className="td_content">
                                <input type="text" className="input_style" id="year"/>년 
                                <input type="text" className="input_style" id="month"/>월 
                                <input type="text" className="input_style" id="day"/>일 
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">학반</td>
                            <td className="td_content">
                                <select className="input_style">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>학년
                                <input type="text" className="input_style" id="class"/>반 
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">중학교명</td>
                            <td className="td_content">
                                <input type="text" className="input_style" id="school_name"/>
                                <button className="btn_style" id="btn_findschool">학교찾기</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">본인연락처</td>
                            <td className="td_content">
                                <input type="text" className="input_style"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">부모연락처</td>
                            <td className="td_content">
                                <input type="text" className="input_style"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">학교연락처</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_style"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">이메일</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_style"/>@<input type="text" className="input_style"/>
                            </td>
                        </tr>
                        <tr id="tr_address">
                            <td className="td_title">주소</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_style" id="base_address"/><AddressModal />
                                <input type="text" className="input_style" id="detail_address"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button router="/gradeinput" buttonName="다음"/>
            </div>
        );
    }
}

export default InfoInputTable;