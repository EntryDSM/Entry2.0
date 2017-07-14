import React from 'react';

class Footer extends React.Component{
    render(){
        return(
            <footer>
                <FooterForm/>
            </footer>
        );
    }
}

const FooterForm = () =>{
    return(
        <div id="Privacy">
            <FooterSubForm 
            FooterEx1 = "(34111)대전광역시 유성구 가정북로 76(장동 23-9)"
            FooterEx2 = "교무실 ☎ : 042-866-8822, 교무실 Fax : 042-867-9900, 행정실 ☎ : 042-866-8885, 행정실 Fax : 042-863-4308"
            FooterEx3 = "사업자 등록 번호 314-83-01600 / 기관 메일 dsmhs@korea.kr"
            FooterEx4 = "Copyright&#9400; 대덕소프트웨어마이스터고등학교. All rights reserved."/>
        </div>
    );
}

const FooterSubForm = (props) =>{
    return(
        <div id="Privacy_Sub">
            {props.FooterEx1}
            <br/>
            {props.FooterEx2}
            <br/>
            {props.FooterEx3}
            <br/>
            <br/>
            {props.FooterEx4}
        </div>
    );
}
export default Footer;