import React from 'react';
import ReactDOM from 'react-dom';
import '../css/MainIntro.css';

class MainIntro extends React.Component{
    render(){
        return(
            <div id="SecondArticle">
                    {this.props.MainInfo.map((info, i) =>
                    {
                        return(
                            <MainInfoBoxes key={i}
                            MainImageExplain = {info.MainImageExplain}
                            SubImageExplain1 = {info.SubImageExplain1}
                            SubImageExplain2 = {info.SubImageExplain2}
                            SubImageExplain3 = {info.SubImageExplain3}
                            ImageUrl = {info.ImageUrl}
                            Direction = {info.Direction}/>
                        );
                    })}
            </div>
        );
    }
}

const MainInfoBoxes = (props) =>{
    if(props.Direction === "left"){
        return(
            <div className="Main_Explain_Boxes">
                <img src={props.ImageUrl} className="Explain_Images"/>

                <div className="Explain_Images_Main">
                    {props.MainImageExplain}
                </div>

                <div className="Explain_Images_Sub">
                    {props.SubImageExplain1}
                    <br/>
                    {props.SubImageExplain2}
                    <br/>
                    {props.SubImageExplain3}
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="Main_Explain_Boxes">
                <img src={props.ImageUrl} className="Explain_Images2"/>

                <div className="Explain_Images_Main2">
                    {props.MainImageExplain}
                </div>

                <div className="Explain_Images_Sub2">
                    {props.SubImageExplain1}
                    <br/>
                    {props.SubImageExplain2}
                    <br/>
                    {props.SubImageExplain3}
                </div>
            </div>
        )
    }
}
export default MainIntro;