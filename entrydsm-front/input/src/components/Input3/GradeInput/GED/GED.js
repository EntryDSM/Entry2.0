import React, {Component} from 'react';

class GED extends Component{
    constructor(props){
        super(props);
        this.state = {
            subjects: [
                {name: '국어'},
                {name: '수학'},
                {name: '사회'},
                {name: '과학'}
            ],
            optionalSubjects: [
                {name: '도덕'},
                {name: '기술'},
                {name: '가정'},
                {name: '체육'},
                {name: '음악'},
                {name: '미술'}
            ]
        }
    }

    render(){
        var inputs = [];
        for(let i=0; i<5; i++){
            inputs.push(<td key={i}><input type="number"/></td>)
        }

        return(
            <tbody>
                <tr>
                    {this.state.subjects.map((subject, index) => {
                        return <Subject name={subject.name} key={index}/>
                    })}
                    <td>
                        <select>
                            {this.state.optionalSubjects.map((subject, index) => {
                                return <option key={index}>{subject.name}</option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    {inputs}
                </tr>
            </tbody>
        );
    }
}

class Subject extends Component{
    render(){
        return(
            <td>
                {this.props.name}
            </td>
        );
    }
}

export default GED;