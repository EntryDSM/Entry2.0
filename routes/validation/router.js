let router = require('express').Router();
let logic = require('./logic');

router.route('/validation').get(logic.validation);

module.exports = router;
