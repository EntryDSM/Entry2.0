import React from 'react';
import Modal from 'react-modal';

class PersonalAgreeModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            isChecked: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.isCheckDone = this.isCheckDone.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    isCheckDone() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        return (
            <div id ="agree_modal">
                <div id="modal_area">
                    <button className="btn_style" id="btn_personalagree" onClick={this.openModal}>개인정보활용동의서</button>&nbsp;
                    본 입학원서의 개인정부 수집‧이용‧제공에 동의합니다.&nbsp;
                    <input type="checkbox" checked= {this.state.isChecked}/>&nbsp;
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="개인정보활용동의서"
                    className="modal_style">

                    <h2 id="modal_title">개인정보활용동의서</h2>
                    <div id="modal_content">
                        &nbsp;본 입학원서에 기재된 지원자의 개인정보는 신입생 입학관리업무의 원활한 수행을 위하여 개인정보의 수집‧유출‧오용‧남용으로부터
                        사생활의 비밀 등을 보호하도록 한 개인정보보호법 규정에 따라 다음과 같이 수집‧이용‧제공됩니다. <br/>
                        <br/>1. (개인정보 처리의 법령상 근거)<br/>
                        &nbsp;&nbsp;&nbsp;본 입학원서에 기재된 개인정보의 처리업무는 초‧중등교육법 제47조 및 동법 시행령 제81조, <br/>
                        &nbsp;&nbsp;&nbsp;제82조, 제84조, 제98조 및 본교의 입학전형 실시계획 등에 근거하고 있습니다.
                        <br/>2. (정보주체의 권리)<br/>
                        &nbsp;&nbsp;&nbsp;지원자는 자신이 제공한 개인정보에 대하여 개인정보 보호법 제4조 및 제35조부터 제38조까지에 <br/>
                        &nbsp;&nbsp;&nbsp;따라 열람‧처리‧정지‧정정‧삭제‧파기 등을 요구할 수 있으며, 개인정보 보호법을 위반한 행위로<br/> 
                        &nbsp;&nbsp;&nbsp;인한 손해 발생시에는 개인정보 보호법 제39조에 따라 손해배상을 청구할 수 있습니다.
                        <br/>3. (개인정보 수집항목)<br/>
                        &nbsp;&nbsp;&nbsp;입학관리 업무의 원활한 수행을 위하여 수집하는 개인정보는 성명, 생년월일, 증명사진, 주소,<br/>
                        &nbsp;&nbsp;&nbsp;전화번호, 학력, 출결사항‧교과성적 등입니다.
                        <br/>4. (개인정보의 수집‧이용 목적)<br/>
                        &nbsp;&nbsp;&nbsp;수집한 지원자의 개인정보는 원서접수, 지원자격‧지원결격 사유 확인, 지원자 본인 확인, 성적산출,<br/>
                        &nbsp;&nbsp;&nbsp;합격자 명부 관리, 합격증명서 발급, 성적 통지, 통계자료 산출 등 입학관리 업무를 위한 정보로 이용<br/>
                        &nbsp;&nbsp;&nbsp;됩니다.
                        <br/>5. (개인정보 제공)<br/>
                        &nbsp;&nbsp;&nbsp;수집한 개인정보는 지원자격‧지원결격 사유 조회 및 교과성적 확인 등을 위하여 지원자가 졸업한<br/>
                        &nbsp;&nbsp;&nbsp;중학교 등 관련된 기관에 제공될 수 있습니다.
                        <br/>6. (개인정보의 보유기간 및 이용기간)<br/>
                        &nbsp;&nbsp;&nbsp;수집한 개인정보는 입학관리 업무를 계속하는 동안 보유‧이용할 수 있으며, 입학관리 업무 완료 후<br/>
                        &nbsp;&nbsp;&nbsp;본인의 삭제요청이 있을 경우에는 모두 삭제됩니다.
                        <br/>7. (개인정보의 수집‧이용‧제공에 대한 동의 거부)<br/>
                        &nbsp;&nbsp;&nbsp;지원자는 개인정보의 수집‧이용‧제공에 대한 동의를 거부할 수 있으며, 동의를 거부할 경우 지원<br/>
                        &nbsp;&nbsp;&nbsp;결격 사유 조회 등 입학관리 업무를 수행할 수 없으므로 원서를 접수할 수 없습니다.
                    </div>
                    <div id="modal_footer">
                        본 입학원서의 개인정부 수집‧이용‧제공에 동의합니다.&nbsp;
                        <input type="checkbox" id="agree_check" checked={this.state.isChecked} onClick={this.isCheckDone}/>
                    </div>
                    <button type="button" id="btn_submit" onClick={this.closeModal} >확인</button>
                </Modal>
            </div>
        );
    }
}

export default PersonalAgreeModal;