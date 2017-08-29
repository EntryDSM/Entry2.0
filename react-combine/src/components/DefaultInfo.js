import React,{Component} from 'react';

class DefaultInfo extends Component {
    render() {
        return (
            <div id="default-info">
                <h2>기본 정보</h2>

                <span>검정고시 여부</span>
                <input 
                type="radio" 
                name="isBlackTest"
                id="test-yes"
                checked = {this.props.isBlackTest === "yes"}
                value="yes"
                onChange={this.props.changeIsBlackTest}/> 
                
                <label htmlFor="test-yes">예</label>
                
                <input 
                type="radio" 
                name="isBlackTest" 
                id="test-no" 
                checked = {this.props.isBlackTest === "no"}
                value="no" 
                onChange={this.props.changeIsBlackTest}/> 
                
                <label htmlFor="test-no">아니오</label><br />

                <span>지역</span>
                <input 
                type="radio"
                name="liveArea"
                id="country" 
                value="country" 
                checked={this.props.liveArea === "country"}
                onChange={this.props.changeLiveArea}/> 

                <label htmlFor="country">전국</label>

                <input 
                type="radio" 
                name="liveArea" 
                id="Daejeon" 
                value="Daejeon"
                checked={this.props.liveArea === "Daejeon"}
                onChange={this.props.changeLiveArea} /> 

                <label htmlFor="Daejeon">대전</label><br />

            </div>
        )
    }
}

export default DefaultInfo;