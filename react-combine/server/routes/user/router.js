let router = require('express').Router();
//let logic = require('./logic'); 

const controller = require('./user.controller');

router.route('/api/signin').post(controller.signin); //로그인
router.route('/api/signup').post(controller.signup); //회원가입 
router.route('/api/email/:name').get(controller.findEmail); // 이름을 기준으로 이메일 검색
router.route('/api/email/authentication/:verifyCode').get(controller.emailAuthentication); //이메일 인증코드 인증
router.route('/api/password').put(controller.changePassword); // 비밀번호 변경
router.route('/api/password/find').post(controller.sendFindPasswordEmail); // 비밀번호 변경 인증코드 발신
router.route('/api/password/change/authentication/:verifyCode').get(controller.passwordChangeAuthentication); // 비밀번호 변경 인증코드 인증

module.exports = router;