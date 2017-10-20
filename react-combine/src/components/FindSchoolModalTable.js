import React, {Component} from 'react';
import '../css/FindSchoolModalTable.css';

class FindSchoolModalTable extends Component {
     render() {
        return (
            <table id="table_school">
                <tbody>
                    <tr id="title_schooltable">
                        <th id="title_government">소속 교육청</th>
                        <th id="title_school_name">학교이름</th>
                        <th id="title_school_code">학교코드</th>
                    </tr>
                    {this.props.schoolList.map((ele) => {
                        return <SchoolList
                                    government={ele.government}
                                    schoolName={ele.name}
                                    schoolCode={ele.code}
                                    setSchoolInfo={this.props.setSchoolInfo}/>
                    })}
                </tbody>
            </table>
        );
    }
}

const SchoolList = (props) => {
    return(
        <tr className="tr_search_result" onClick={props.setSchoolInfo}>
            <td className="td_government">{props.government}</td>
            <td className="td_school_name">{props.schoolName}</td> 
            <td className="td_school_code">{props.schoolCode}</td>
        </tr>
    );
}

export default FindSchoolModalTable;