let router = require('express').Router();
let logic = require('./logic');

router.route('/classification/:userid').get(logic.loadType);
router.route('/classification/:userid').post(logic.saveType);
router.route('/user/info/:userid').get(logic.load);
router.route('/user/info/:userid').post(logic.save);
router.route('/validation').get(logic.validation);
router.route('/preview').get(logic.demo);
router.route('/introduce').put(logic.intro);

module.exports = router;
