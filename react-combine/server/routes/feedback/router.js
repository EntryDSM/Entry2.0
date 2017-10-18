const router = require('express').Router();
const onlyUser = require('../../middlewares/onlyUser');
const controller = require('./feedback.controller');

router.route('/feedback').post(onlyUser, controller.postFeedback);


module.exports = router;