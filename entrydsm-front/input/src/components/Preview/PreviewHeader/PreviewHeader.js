import React, {Component} from 'react';
import styles from './PreviewHeader.css';
 
class PreviewHeader extends Component {

    constructor() {
        super();
    }
 
     render() {
        var buttons = null;
        if(this.props.datas != null) {
            console.log('data', this.props.datas);
            buttons = this.props.datas.map(function(data, index) {
                return(
                    <button key={index} className={styles.tabButton} onClick="">{data.name}</button>
                /*
                    해당 컬럼 ㄱ개수에 맞게 binding 해주고 javascript 로 css 조정 width: calc(100% / 5);  || width: calc(100% / 4);
                */
                )
            });

        }

        return (
            <div className= {styles.tab}>
                {buttons}
            </div>
        );
    }
}

export default PreviewHeader;