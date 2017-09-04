import React, { Component } from 'react';

class SocietyDetail extends Component {
    render() {
        return (
            <div id="society-detail" style={{
                visibility : this.props.isSocietySelected? "visible":"hidden"
            }}>
                <ul>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="basic"
                            id="basic"
                            checked={this.props.typeOfSociety==="basic"}
                            onChange={this.props.changeTypeOfSociety} /> <label htmlFor="basic">기초생활수급권자</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="one-parent"
                            id="one-parent"
                            checked={this.props.typeOfSociety==="one-parent"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="one-parent">한부모가족보호대상자</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="poor"
                            id="poor"
                            checked={this.props.typeOfSociety==="poor"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="poor">차상위 계층</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="more-poor"
                            id="more-poor"
                            checked={this.props.typeOfSociety==="more-poor"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="more-poor">차차상위 계층</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="from-north"
                            id="from-north"
                            checked={this.props.typeOfSociety==="from-north"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="from-north">북한이탈주민</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="multi-culture"
                            id="multi-culture"
                            checked={this.props.typeOfSociety==="multi-culture"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="multi-culture">다문화가정</label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="typeOfSociety"
                            value="etc"
                            id="etc"
                            checked={this.props.typeOfSociety==="etc"}
                            onChange={this.props.changeTypeOfSociety} />
                        <label htmlFor="etc">그 외 대상자</label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SocietyDetail;