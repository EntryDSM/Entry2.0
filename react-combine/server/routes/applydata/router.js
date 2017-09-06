let router = require('express').Router();
let logic = require('./logic');

router.route('/classification/').get(logic.loadType);
router.route('/classification/').put(logic.saveType);
router.route('/user/info/:userid').get(logic.load);
router.route('/user/info/:userid').put(logic.save);
router.route('/validation').get(logic.validation);
router.route('/preview').get(logic.demo);
router.route('/user/introduce').put(logic.intro);
router.route('/user/introduce').get(logic.getdemo);

module.exports = router;
