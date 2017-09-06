let router = require('express').Router();
let logic = require('./logic');
router.route('/signin').post(logic.login); //로그인 라우팅
router.route('/signup').post(logic.adduser); //회원가입 라우팅
router.route('/unemail/:email').get(logic.unemail); //이메일 인증확인 라우팅
router.route('/checkpw/:email').get(logic.checkmail);
router.route('/findEmail').get(logic.findEmail); //이메일을 찾기위해서 이름 입력시 해당하는 이메일 출력
router.route('/account/password/demand').post(logic.sendfindemail); //비밀번호 변경을위한 메일 보내기 라우팅
router.route('/account/password/change').put(logic.changepassword); //비밀번호 인증 확인 라우팅
router.route('/mypage').post(logic.myPage);

module.exports = router;