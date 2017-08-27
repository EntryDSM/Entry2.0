import React, {Component} from 'react';
import styles from './PageNumber.css';
 
class PageNumber extends Component {

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
                return(
                <a href="#" key={index} className="btn_modalnext" onClick={()=> that.props.searchAddr(parseInt(data))}>
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

export default PageNumber;