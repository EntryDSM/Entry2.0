import React from 'react';
import LogoPart from '../components/LogoPart';
import FormTitle from '../components/FormTitle';
import NoticeTable from '../components/NoticeTable';
import Button from '../components/Button';
import '../css/Notice.css';

class Notice extends React.Component{
    render(){
        return(
            <div id="login-form">
                <LogoPart ImageUrl = {require('../images/DSM Logo.png')}/>
                <FormTitle Title = "게시판"/>
                <NoticeTable />
                <div id="button_area">
                    <Button router="/writenotice" buttonName="글쓰기"/>
                </div>
            </div>
        );  
    }
}

export default Notice;