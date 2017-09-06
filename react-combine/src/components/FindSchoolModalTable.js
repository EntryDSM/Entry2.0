import React, {Component} from 'react';
import '../css/FindSchoolModalTable.css';

class FindSchoolModalTable extends Component {

    constructor() {
        super();
    }
 
    render() {
        // var arr = [];

        // var addressData = null;
        // var tableHeader = null;
        // if(this.props.datas != null) {
        //     tableHeader =
        //     <tr>
        //         <th id="th_addr_road">
        //             도로명 주소
        //         </th>
        //         <th id="th_addr_zip">
        //             우편번호
        //         </th>
        //     </tr>
        //     addressData = this.props.datas.map(function(data, index) {
        //         return(<tr key={index}>
        //             <td className="road_address">
        //                 {data.roadAddr}
        //             </td>
        //             <td className="zipNo">
        //                 {data.zipNo}
        //             </td>
        //         </tr>)
        //     });
        // } 

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