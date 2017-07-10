import React,{Component} from 'react'

class SchoolIntro extends Component{
    render(){
        return(
        <section id="school-intro">
            <h1>학교 소개</h1>
            { this.props.schoolInfos.map((info,i)=>{
            return(<IntroSection key = {i}
            title={info.title} 
            description={info.description} 
            direction={info.direction} 
            imgURL={info.imgURL}/>
            )})
            }
        </section>
        )
    }
}

const IntroSection = (props)=>{
    if(props.direction === "right"){
        return(
            <article>
                <div className="description">
                    <h1>{props.title}</h1>
                    <pre>
                        {props.description}
                    </pre>
                </div>
                <img src={props.imgURL} alt="thumbnail"/>
            </article>
        )
    }else{
        return(
            <article>
                <img src={props.imgURL} alt="thumbnail"/>
                <div className="description">
                    <h1>{props.title}</h1>
                    <pre>
                        {props.description}
                    </pre>
                </div>
            </article>
        )
    }
}

export default SchoolIntro;