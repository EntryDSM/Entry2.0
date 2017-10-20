import React, {Component} from 'react';
 
class PreviewHeader extends Component {
     render() {
        var that = this;
        var buttons = null;
        console.log(this.props);
        if(this.props.datas != null) {
            buttons = this.props.datas.map(function(data, index) {
                console.log(data);
                return(
                    <button key={index} id={data.id} className="tabButton" onClick={()=> that.props.setPage(data.target)}>{data.name}<img className="printed" src={require('../images/green_button.png')}/></button>
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