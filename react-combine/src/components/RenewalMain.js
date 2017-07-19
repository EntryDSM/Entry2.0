import React, { Component } from 'react';
import { Link } from 'react-router';

class RenewalMain extends Component {
    render() {
        return (
            <div id="renewal">
                <Logo logoURL={require("../images/logo.png")} />
                <ApplyMenu />
            </div>
        )
    }
}

const ApplyMenu = () => {
    return (
        <div id="apply-menu">
            <IconMenu title="원서접수" iconURL={require("../images/write-icon.png")} />
            <span style={{
                display: "inline-block",
                fontSize: 400,
                marginBottom: 60,
                fontWeight: "lighter"
            }}>|</span>
            <IconMenu title="조회&수정" iconURL={require("../images/search-icon.png")} />
        </div>
    )
}

const Logo = (props) => {
    return (
        <div>
            <img src={props.logoURL} alt="logo" id="logo" />
            <h1 style={{fontFamily : "Poiret One, cursive",fontSize:16}}>DaeDeok SoftWare Meister HighSchool</h1>
        </div>
    )
}

const IconMenu = (props) => {
    return (
        <div className="icon-menu">
            <span>{props.title}</span><br />
            <img src={props.iconURL} alt="icon" className="icon" />
        </div>
    )
}


export default RenewalMain;