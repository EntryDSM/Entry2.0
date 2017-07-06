let router = require('express').Router();
let logic = require('./logic');

router.route('/vaildation').get(logic.vaildationCheck);

module.exports = router;