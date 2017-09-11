import React, {Component} from 'react';
import '../css/FindSchoolModalTable.css';

class FindSchoolModalTable extends Component {
     render() {
        return (
            <table id="table_school">
                <tbody>
                    <tr id="title_schooltable">
                        <th id="title_school_name">학교이름</th>
                        <th id="title_school_code">학교코드</th>
                    </tr>
                    <tr>
                        <td className="td_school_name">장안중학교</td>
                        <td className="td_school_code">C100001639</td>
                    </tr>
                    <tr>
                        <td className="td_school_name">해솔중학교</td>
                        <td className="td_school_code">J100006457</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default FindSchoolModalTable;