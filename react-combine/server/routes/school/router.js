let router = require('express').Router();
const controller = require('./school.controller');

router.route('/school').get(controller.search);

module.exports = router;