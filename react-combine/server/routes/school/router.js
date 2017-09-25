let router = require('express').Router();
const controller = require('./school.controller');

router.route('/schoolCode').get(controller.search);

module.exports = router;