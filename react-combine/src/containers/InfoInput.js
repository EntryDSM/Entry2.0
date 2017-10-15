import React from 'react';
import InfoInputTable from '../components/InfoInputTable';
import InputHeader from '../components/InputHeader';
import Button from '../components/Button';
import '../css/InfoInput.css'
import axios from 'axios';

class InfoInput extends React.Component {
    
    render(){
        return(
            <div id="contents">
                <div id="info_input">
                    <div className="inputTitle">
                        <InputHeader now={"인적 사항"} />
                    </div>
                    <InfoInputTable />
                    <Button router="/classification" buttonName="이전"/>
                    <Button router="/gradeinput" buttonName="다음"/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        var pointbefore = document.getElementById("point_step2");
        var pointnow = document.getElementById("point_step3");
        var pointnext = document.getElementById("point_step4");
        pointnow.style.fill = "salmon";
        pointbefore.style.fill = "#B9B4B4";
        pointnext.style.fill = "#B9B4B4";

        axios({
            method: "get",
            url: 'http://114.108.135.15:8080/user/info/',
            withCredentials: 'false',
            data: {
                sex : document.getElementsByName("sex").values,
                image: document.getElementById("IDPhoto").value,
                grade : 3,
                class : document.getElementById("class").value, 
                parentsName : document.getElementById("parent_name").value,
                schoolCode : Number, 
                schoolName : document.getElementById("school_name").value,
                schoolTel : document.getElementById("school_tel").value,
                phoneNum : document.getElementById("my_tel").value,
                parentsTel : document.getElementById("parent_tel").value,
                birth : document.getElementById("year").value + "/" + document.getElementById("month").value + "/" + document.getElementById("day").value,
                baseAddress : document.getElementById("base_address").value, 
                detailAddress : document.getElementById("detail_address").value
            },
        })
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }
}

export default InfoInput;