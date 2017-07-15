import React from 'react';

class LogoPart extends React.Component{
    render(){
        return(
            <div id="LogoPart">
                <img src = {this.props.ImageUrl} alt="LogoImage" style={{width: 100 +"%"}}/>
            </div>
        );
    }
}

export default LogoPart;