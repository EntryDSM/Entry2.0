let router = require('express').Router();
let logic = require('./logic');

router.route('/schoolcode').get(logic.schoolcode);

module.exports = router;
