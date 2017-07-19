import React, {Component} from 'react';
import '../css/AddressModalTable.css';
 
class AddressModalTable extends Component {

    constructor(props) {
        super(props);

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
                        <a href="#" className="data_roadAddr">{data.roadAddr}</a>
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

    componentDidUpdate() {
        var i;

        for(i=0; i<10; i++){
            var input = document.getElementById("base_address");
            var data = document.getElementsByClassName("data_roadAddr")[i];
            input.value = data.textContent; 
        }
        this.setState({modalIsOpen: true});
    }
    
}

export default AddressModalTable;