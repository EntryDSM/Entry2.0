import React, {Component} from 'react';
import '../css/AddressModalTable.css';
 
class AddressModalTable extends Component {

    constructor() {
        super();
    }
 
     render() {
        var arr = [];

        var addressData = null;
        var tableHeader = null;
        if(this.props.datas != null) {
            tableHeader =
            <tr>
                <th id="th_addr_road">
                    도로명 주소
                </th>
                <th id="th_addr_zip">
                    우편번호
                </th>
            </tr>
            addressData = this.props.datas.map(function(data, index) {
                return(<tr key={index}>
                    <td className="road_address">
                        {data.roadAddr}
                    </td>
                    <td className="zipNo">
                        {data.zipNo}
                    </td>
                </tr>)
            });
        } 

        return (
            <table id="table_addr">
                <tbody id="addrResult">
                    {tableHeader}
                    {addressData}
                </tbody>
            </table>
        );
    }
}

export default AddressModalTable;