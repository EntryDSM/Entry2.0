let router = require('express').Router();
let logic = require('./logic');

router.route('/step1/:userid').get(logic.load);
router.route('/step1/:userid').post(logic.save);
router.route('/validation').get(logic.validation);
router.route('/preview').get(logic.demo);

module.exports = router;
