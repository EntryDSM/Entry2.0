import React, {Component} from 'react';
import styles from '../css/AddressModalPagenum.css';
 
class AddressModalPagenum extends Component {

    constructor() {
        super();
    }
 
     render() {
        var arr = [];

        var pageNumbers = null;
        var that = this;
        // console.log('data',this.props.datas);
        if(this.props.datas != null) {
            pageNumbers = this.props.datas.map(function(data, index) {
                var pagenum;
                if(data==">"){
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