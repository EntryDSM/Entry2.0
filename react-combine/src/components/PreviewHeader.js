import React, {Component} from 'react';
 
class PreviewHeader extends Component {

    constructor() {
        super();
    }

     render() {
        var that = this;
        var buttons = null;
        if(this.props.datas != null) {
            buttons = this.props.datas.map(function(data, index) {
                return(
                    <button key={index} className="tabButton" onClick={()=> that.props.setPage(data.target)}>{data.name}</button>
                /*
                    해당 컬럼 개수에 맞게 binding 해주고 javascript 로 css 조정 width: calc(100% / 5);  || width: calc(100% / 4);
                */
                )
            });

        }

        return (
            <div className="tab">
                {buttons}
            </div>
        );
    }
}

export default PreviewHeader;