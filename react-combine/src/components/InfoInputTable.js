import React, {Component} from 'react';
import AddressModal from './AddressModal';
import FindSchoolModal from './FindSchoolModal';
import UploadImage from './UploadImage';

class InfoInputTable extends Component {
    render() {
        let days = new Array;
        if(this.props.month == 1 || this.props.month == 3 || this.props.month == 5 || this.props.month == 7 || this.props.month == 8 || this.props.month == 10 || this.props.month == 12){
            for(let i = 1; i <= 31; i++){
                if(i == this.props.birthDay){
                    days.push(<Birth_day day={i} selected="selected"/>)
                }
                days.push(<Birth_day day={i} selected=""/>)
            }
        } else if(this.props.month == 2){
            for(let i = 1; i <= 28; i++){
                if(i == this.props.birthDay){
                    days.push(<Birth_day day={i} selected="selected"/>)
                }
                days.push(<Birth_day day={i} selected=""/>)
            }
        } else {
            for(let i = 1; i <= 30; i++){
                if(i == this.props.birthDay){
                    days.push(<Birth_day day={i} selected="selected"/>)
                }
                days.push(<Birth_day day={i} selected=""/>)
            }
        }

        return(
            <div id="info_input_table">
                <table id="table">
                    <tbody>
                        <tr id="tr_name">
                            <td className="td_title">성명</td>
                            <td className="td_content"><input type="text" className="input_style" value={this.props.name} readOnly/></td>
                            <td className="td_space" rowSpan="6"><UploadImage 
                                                                        previewFile={this.props.previewFile}
                                                                        profileImg={this.props.profileImg}/></td>
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
                                <select name="birthYear" onChange={this.props.setter} className="birth_select">                                    
                                    <option selected={this.props.birthYear == 2004 ? 'selected' : ''}>2004</option>
                                    <option selected={this.props.birthYear == 2003 ? 'selected' : ''}>2003</option>
                                    <option selected={this.props.birthYear == 2002 ? 'selected' : ''}>2002</option>
                                    <option selected={this.props.birthYear == 2001 ? 'selected' : ''}>2001</option>
                                    <option selected={this.props.birthYear == 2000 ? 'selected' : ''}>2000</option>
                                    <option selected={this.props.birthYear == 1999 ? 'selected' : ''}>1999</option>
                                    <option selected={this.props.birthYear == 1998 ? 'selected' : ''}>1998</option>
                                    <option selected={this.props.birthYear == 1997 ? 'selected' : ''}>1997</option>
                                    <option selected={this.props.birthYear == 1996 ? 'selected' : ''}>1996</option>
                                    <option selected={this.props.birthYear == 1995 ? 'selected' : ''}>1995</option>
                                    <option selected={this.props.birthYear == 1994 ? 'selected' : ''}>1994</option>
                                    <option selected={this.props.birthYear == 1993 ? 'selected' : ''}>1993</option>
                                    <option selected={this.props.birthYear == 1992 ? 'selected' : ''}>1992</option>
                                    <option selected={this.props.birthYear == 1991 ? 'selected' : ''}>1991</option>
                                    <option selected={this.props.birthYear == 1990 ? 'selected' : ''}>1990</option> 
                                </select>
                                <label className="birth_select_label">년</label>
                                <select name="birthMonth" onChange={this.props.setter} className="birth_select">
                                    <option value="" selected disabled hidden></option>
                                    <option selected={this.props.month == 1 ? 'selected' : ''}>1</option>
                                    <option selected={this.props.month == 2 ? 'selected' : ''}>2</option>
                                    <option selected={this.props.month == 3 ? 'selected' : ''}>3</option>
                                    <option selected={this.props.month == 4 ? 'selected' : ''}>4</option>
                                    <option selected={this.props.month == 5 ? 'selected' : ''}>5</option>
                                    <option selected={this.props.month == 6 ? 'selected' : ''}>6</option>
                                    <option selected={this.props.month == 7 ? 'selected' : ''}>7</option>
                                    <option selected={this.props.month == 8 ? 'selected' : ''}>8</option>
                                    <option selected={this.props.month == 9 ? 'selected' : ''}>9</option>
                                    <option selected={this.props.month == 10 ? 'selected' : ''}>10</option>
                                    <option selected={this.props.month == 11 ? 'selected' : ''}>11</option>
                                    <option selected={this.props.month == 12 ? 'selected' : ''}>12</option>                                 
                                </select>
                                <label className="birth_select_label">월</label>
                                <select name="birthDay" onChange={this.props.setter} className="birth_select">
                                    <option value="" selected disabled hidden></option>
                                    {days}
                                </select>
                                <label className="birth_select_label">일</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_title">학반</td>
                            <td className="td_content">
                                &nbsp;&nbsp;&nbsp;3학년
                                <input type="text" className="input_style" name="class" id="class" value={this.props.class} onChange={this.props.setter} maxLength="2"/>반
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

const Birth_day = (props) => {
    return(
        <option selected={props.selected}>{props.day}</option>
    );
}

export default InfoInputTable;