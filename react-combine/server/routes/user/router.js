let router = require('express').Router();
//let logic = require('./logic'); 

const controller = require('./user.controller');

router.route('/api/signin').post(controller.signin); //로그인 라우팅
router.route('/api/signup').post(controller.signup); //회원가입 라우팅
router.route('/api/email/authentication/:verifyCode').get(controller.emailAuthentication); //이메일 인증확인 라우팅
//router.route('/api/password/find/:email').get(controller.); //비밀번호를 찾기위해 이메일 입력시 ejs로 렌더링
router.route('/api/email/find/:name').get(controller.findEmail); //이메일을 찾기위해서 이름 입력시 해당하는 이메일 출력
// router.route('/api/account/password/demand').post(logic.sendfindemail); //비밀번호 변경을위한 메일 보내기 라우팅
// router.route('/api/password/verify/').put(logic.changepassword); //비밀번호 인증 확인 라우팅

module.exports = router;