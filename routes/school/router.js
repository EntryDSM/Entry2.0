let router = require('express').Router();
let logic = require('./logic');

router.route('/user/inquiry').get(logic.schoolcode);

module.exports = router;
