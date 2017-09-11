let router = require('express').Router();
//let logic = require('./logic'); 

const controller = require('./user.controller');

router.route('/signin').post(controller.signin); //로그인
router.route('/signup').post(controller.signup); //회원가입 
router.route('/email/:name').get(controller.findEmail); // 이름을 기준으로 이메일 검색
router.route('/email/authentication/:verifyCode').get(controller.emailAuthentication); //이메일 인증코드 인증
router.route('/password').put(controller.changePassword); // 비밀번호 변경
router.route('/password/find').post(controller.sendFindPasswordEmail); // 비밀번호 변경 인증코드 발신
router.route('/password/change/authentication/:verifyCode').get(controller.passwordChangeAuthentication); // 비밀번호 변경 인증코드 인증

module.exports = router;