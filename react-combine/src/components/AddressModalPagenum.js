import React, {Component} from 'react';
import '../css/AddressModalPagenum.css';
 
class AddressModalPagenum extends Component { 
     render() {
        var pageNumbers = null;
        var that = this;
        if(this.props.datas != null) {
            pageNumbers = this.props.datas.map(function(data, index) {
                var pagenum;
                if(data === ">"){
                    pagenum = that.props.datas[that.props.datas.length-2] + 1;

                } else {
                    pagenum = data;
                }

                return(
                <a href="#" key={index} className="btn_modalnext" onClick={()=> that.props.searchAddr(pagenum)}>
                    {data}
                </a>)
            });
        }

        return (
            <div id="modalPage">
                {pageNumbers}
            </div>
        );
    }
}

export default AddressModalPagenum;