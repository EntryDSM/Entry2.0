let router = require('express').Router();

const controller = require('./applyData.controller');
const onlyUser = require('../../middlewares/onlyUser');

router.route('/user/classification').get(onlyUser, controller.getUserClassification);
router.route('/user/classification').put(onlyUser, controller.reviseUserClassification);
router.route('/user/info').get(onlyUser, controller.getUserInfo);
router.route('/user/info').put(onlyUser, controller.reviseUserInfo);
router.route('/user/grade').get(onlyUser, controller.getUserGrade);
router.route('/user/grade').put(onlyUser, controller.reviseUserGrade);
router.route('/user/introduce').get(onlyUser, controller.getUserIntroduce);
router.route('/user/introduce').put(onlyUser, controller.reviseUserIntroduce);
router.route('/validation').get(onlyUser, controller.validation);
router.route('/preview').get(onlyUser, controller.preview);
router.route('/upload/profile').get(onlyUser, controller.getProfile);
router.route('/upload/profile').put(onlyUser, controller.reviseProfile);

module.exports = router;