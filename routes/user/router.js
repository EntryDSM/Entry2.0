let router = require('express').Router();
let logic = require('./logic');

router.route('/signin').post(logic.login);
router.route('/signup').post(logic.adduser);
router.route('/check/:email').get(logic.sendemail);
router.route('/unemail/:email').get(logic.unemail);
router.route('/checkpw/:salt').get(logic.checkmail);
router.route('/findEmail').get(logic.findEmail);
router.route('/account/password/demand').post(logic.sendfindemail);
router.route('/account/password').post(logic.changepassword);

module.exports = router;