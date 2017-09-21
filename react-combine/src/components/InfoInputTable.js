import React from 'react';
import AddressModal from './AddressModal';
import FindSchoolModal from './FindSchoolModal';
import UploadImage from './UploadImage';

class InfoInputTable extends React.Component {
    render() {
        return(
            <div id="info_input_table">
                <table id="table">
                    <tbody>
                        <tr id="tr_name">
                            <td className="td_title">성명</td>
                            <td className="td_content"><input type="text" className="input_style" value={this.props.name} readOnly/></td>
                            <td className="td_space" rowSpan="6"><UploadImage previewFile={this.props.previewFile}/></td>
                        </tr>
                        <tr>
                            <td className="td_title">성별</td>
                            <td className="td_content">
                                <input type="radio" name="sex" className="input_style" value="남" checked={this.props.sex === "남"} onClick={this.props.setter} />남
                                <input type="radio" name="sex" className="input_style" value="여" checked={this.props.sex === "여"} onClick={this.props.setter} />여
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">생년월일</td>
                            <td className="td_content">
                                <input type="text" className="input_style" name="birthYear" id="year" value={this.props.birthYear} onChange={this.props.setter}/>년 
                                <input type="text" className="input_style" name="birthMonth" id="month" value={this.props.birthMonth} onChange={this.props.setter}/>월 
                                <input type="text" className="input_style" name="birthDay" id="day" value={this.props.birthDay} onChange={this.props.setter}/>일 
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">학반</td>
                            <td className="td_content">
                                &nbsp;&nbsp;&nbsp;3학년
                                <input type="text" className="input_style" name="class" id="class" value={this.props.class} onChange={this.props.setter}/>반
                                <input type="text" className="input_style" name="number" id="class" value={this.props.number} onChange={this.props.setter} maxLength="2" />번
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">중학교명</td>
                            <td className="td_content">
                                <input type="text" className="input_style" id="school_name" value={this.props.schoolName} readOnly/>
                                <FindSchoolModal 
                                    schoolList={this.props.schoolList}
                                    getSchoolCode={this.props.getSchoolCode}
                                    setSchoolInfo={this.props.setSchoolInfo}
                                    modalIsOpen={this.props.modalIsOpen}
                                    openModal={this.props.openModal}
                                    closeModal={this.props.closeModal}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">본인연락처</td>
                            <td className="td_content">
                                <input type="text" className="input_tel" id="phoneNum" maxLength="3" name="0" value={this.props.phoneNum[0]} onChange={this.props.setPhoneNum} />-
                                <input type="text" className="input_tel" id="phoneNum" maxLength="4" name="1" value={this.props.phoneNum[1]} onChange={this.props.setPhoneNum} />-
                                <input type="text" className="input_tel" id="phoneNum" maxLength="4" name="2" value={this.props.phoneNum[2]} onChange={this.props.setPhoneNum} />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">보호자명</td>
                            <td className="td_content">
                                <input type="text" className="input_style" name="parentsName" id="parent_name" value={this.props.parentsName} onChange={this.props.setter}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">부모연락처</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_tel" id="parentsTel" maxLength="3" name="0" value={this.props.parentsTel[0]} onChange={this.props.setParentsTel} />-
                                <input type="text" className="input_tel" id="parentsTel" maxLength="4" name="1" value={this.props.parentsTel[1]} onChange={this.props.setParentsTel} />-
                                <input type="text" className="input_tel" id="parentsTel" maxLength="4" name="2" value={this.props.parentsTel[2]} onChange={this.props.setParentsTel} />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">학교연락처</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_tel" id="schoolTel" maxLength="3" name="0" value={this.props.schoolTel[0]} onChange={this.props.setSchoolTel} />-
                                <input type="text" className="input_tel" id="schoolTel" maxLength="4" name="1" value={this.props.schoolTel[1]} onChange={this.props.setSchoolTel} />-
                                <input type="text" className="input_tel" id="schoolTel" maxLength="4" name="2" value={this.props.schoolTel[2]} onChange={this.props.setSchoolTel} />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">이메일</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_style" value={this.props.email} readOnly/>
                            </td>
                        </tr>
                        <tr id="tr_address">
                            <td className="td_title">주소</td>
                            <td className="td_content" colSpan="2">
                                <input type="text" className="input_style" id="base_address" value={this.props.baseAddress} readOnly/><AddressModal setAddress={this.props.setAddress}/>
                                <input type="text" className="input_style" name="detailAddress" id="detail_address" value={this.props.detailAddress} onChange={this.props.setter}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default InfoInputTable;